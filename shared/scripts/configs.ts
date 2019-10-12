import { basename, join, relative } from 'path'
import execa from 'execa'
import globby from 'globby'
import { readFile, readJson, writeJson, writeFile } from 'fs-extra'

export interface PackageInfo {
  location: string
  workspaceDependencies: string[]
  mismatchedWorkspaceDependencies: string[]
}

export interface WorkspaceInfo {
  [packageName: string]: PackageInfo
}

export interface File {
  name: string
  path: string
  data: string
}

const getWorkSpaceCwd = async (cwd = process.cwd(), levels = 5): Promise<string> => {
  if (levels < 0) {
    throw Error(`getWorkSpaceCwd: cannot find yarn workspace root`)
  }
  try {
    const pkg = await readJson(join(cwd, 'package.json'))

    if (pkg && pkg.workspaces) {
      return cwd
    }
  } catch (e) {
    // noop
  }

  return getWorkSpaceCwd(join(cwd, '..'), levels - 1)
}

const getWorkspaceInfo = async (): Promise<WorkspaceInfo> => {
  const { stdout } = await execa('yarn', ['workspaces', 'info', '--json'])
  const { data } = JSON.parse(stdout)

  if (!data) {
    throw Error(`getWorkspaceInfo: cannot get workspace info from yarn`)
  }

  // it's double jsoned...
  return JSON.parse(data)
}

const getFile = async (path: string): Promise<File> => {
  let data: any

  try {
    data = await readFile(path, 'utf-8')
  } catch (e) {
    throw Error(`getFile: cannot read ${path}`)
  }

  return {
    name: basename(path),
    data,
    path,
  }
}

const getTemplateFiles = async (): Promise<File[]> => {
  const paths = await globby(__dirname + '/templates/*')

  return Promise.all(paths.map(getFile))
}

const syncTemplates = async (cwd: string, info: WorkspaceInfo, templates: File[]) => {
  const pastable = templates.filter(file => !['package.json', 'tsconfig.comp.json'].includes(file.name))

  const p1 = Object.values(info).map(({ location }) => {
    const p2 = pastable.map(template => {
      const path = join(cwd, location, template.name)

      console.log(`syncTemplates: ${path}`)
      return writeFile(path, template.data)
    })

    return Promise.all(p2)
  })

  await Promise.all(p1)
}

const syncPackage = async (cwd: string, info: WorkspaceInfo, templates: File[]) => {
  const [templateFile] = templates.filter(file => file.name === 'package.json')
  const tempPkg = JSON.parse(templateFile.data)

  const p = Object.entries(info).map(async ([, { location }]) => {
    const path = join(cwd, location, 'package.json')

    const nextName = `@${basename(join(location, '..'))}/${basename(location)}`

    const prevPkg = await readJson(join(cwd, location, 'package.json'))

    const nextPkg = {
      name: nextName,
      description: tempPkg.description,
      repository: tempPkg.repository,
      author: tempPkg.author,
      version: tempPkg.version,
      license: tempPkg.license,
      private: tempPkg.private,
      scripts: {
        ...tempPkg.scripts,
        ...prevPkg.scripts,
      },
      engines: tempPkg.engines,
      dependencies: { ...prevPkg.dependencies },
      devDependencies: { ...prevPkg.devDependencies },
    }

    console.log(`writePkg: ${path}`)
    return writeJson(path, nextPkg, { spaces: 2 })
  })

  return Promise.all(p)
}

const syncComposite = async (cwd: string, info: WorkspaceInfo, templates: File[]) => {
  const TSCONFIG_COMP_NAME = 'tsconfig.comp.json'

  const [tsconfigCompFile] = templates.filter(file => file.name === TSCONFIG_COMP_NAME)

  const tsconfigComp = JSON.parse(tsconfigCompFile.data)

  const getReferencePath = (location: string, targetName: string) => {
    const target = Object.entries(info).find(([name]) => name === targetName)

    if (!target) {
      throw Error(`syncComposite: cannot find ${targetName}`)
    }

    const [, { location: targetLocation }] = target

    return join(relative(location, targetLocation), TSCONFIG_COMP_NAME)
  }

  const p = Object.values(info).map(({ location, workspaceDependencies = [] }) => {
    const next = { ...tsconfigComp }
    const path = join(cwd, location, TSCONFIG_COMP_NAME)

    next.references = workspaceDependencies.map(dep => ({ path: getReferencePath(location, dep) }))

    console.log(`syncComposite: ${path}`)
    return writeJson(path, next, { spaces: 2 })
  })

  return Promise.all(p)
}

export const main = async () => {
  const cwd = await getWorkSpaceCwd()
  const info = await getWorkspaceInfo()
  const templates = await getTemplateFiles()

  // for now
  delete info['@shared/scripts']

  await syncTemplates(cwd, info, templates)
  await syncPackage(cwd, info, templates)
  await syncComposite(cwd, info, templates)
}

main()
