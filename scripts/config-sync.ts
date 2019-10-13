import { join } from 'path'
import { WorkspaceInfo, PackageInfo, FileString, FileType } from './types'
import {
  readTemplateFiles,
  replaceTemplateTokens,
  getWorkspaceInfo,
  readTemplateFileJson,
  readFileJson,
  stringifyFileJson,
  getCompilerPaths,
  getReferencePaths,
  writeFiles,
  tryReadFile,
} from './confi-utils'
import { PACKAGE_JSON, TSCONFIG_COMP, TEMPLATES_PASTE, TSCONFIG, JEST_CONFIG } from './config-constants'

export const syncTemplates = async (info: WorkspaceInfo): Promise<FileString[]> => {
  const files = await readTemplateFiles(TEMPLATES_PASTE)

  const handle = (target: PackageInfo) =>
    files.map(file => replaceTemplateTokens(target, file)).map(file => ({ ...file, path: join(target.dir, file.name) }))

  // wtf, cannot add flatMap here
  return Object.values(info.map)
    .map(handle)
    .reduce((acc, arr) => [...acc, ...arr])
}

const syncPackages = async (info: WorkspaceInfo): Promise<FileString[]> => {
  const template = await readTemplateFileJson(PACKAGE_JSON)

  const handle = async (target: PackageInfo): Promise<FileString> => {
    const prev = await readFileJson(join(target.dir, PACKAGE_JSON))

    const data = {
      name: target.name,
      description: template.data.description,
      repository: template.data.repository,
      author: template.data.author,
      version: template.data.version,
      license: template.data.license,
      private: template.data.private,
      main: template.data.main,
      types: template.data.types,
      scripts: {
        ...prev.data.scripts,
        ...template.data.scripts,
      },
      engines: template.data.engines,
      dependencies: { ...prev.data.dependencies },
      devDependencies: { ...prev.data.devDependencies },
    }

    return stringifyFileJson({ ...prev, data })
  }

  return Promise.all(Object.values(info.map).map(handle))
}

const syncTsConfigs = async (info: WorkspaceInfo): Promise<FileString[]> => {
  const tsConfig = await readTemplateFileJson(TSCONFIG)

  const handle = async (target: PackageInfo) => {
    const path = join(target.dir, TSCONFIG)

    // clone
    const data = { ...tsConfig.data }

    // handle paths
    const paths = getCompilerPaths(target.dir, target.workspaceDependencies, info)

    if (Object.keys(paths).length !== 0) {
      data.compilerOptions = { ...tsConfig.data.compilerOptions, baseUrl: '.', paths }
    }

    // replace tokens
    const file = stringifyFileJson({ ...tsConfig, path, data })
    const replaced = replaceTemplateTokens(target, file)

    return replaced
  }

  return Promise.all(Object.values(info.map).map(handle))
}

const syncTsConfigsComp = async (info: WorkspaceInfo): Promise<FileString[]> => {
  const tsConfigComp = await readTemplateFileJson(TSCONFIG_COMP)

  const handle = async (target: PackageInfo) => {
    const path = join(target.dir, TSCONFIG_COMP)
    const references = getReferencePaths(target.dir, target.workspaceDependencies, info)

    // clone
    // ! references cannot be empty array :<
    const data = references.length !== 0 ? { ...tsConfigComp.data, references } : tsConfigComp.data

    // replace tokens
    const file = stringifyFileJson({ ...tsConfigComp, path, data })
    const replaced = replaceTemplateTokens(target, file)

    return replaced
  }

  return Promise.all(Object.values(info.map).map(handle))
}

const syncRootTsConfigsComp = async (info: WorkspaceInfo): Promise<FileString> => {
  const tsConfigCompRoot = await readFileJson(join(info.cwd, TSCONFIG_COMP))

  tsConfigCompRoot.data.references = getReferencePaths(info.cwd, Object.keys(info.map), info)

  return stringifyFileJson(tsConfigCompRoot)
}

const syncRootJestConfig = async (info: WorkspaceInfo): Promise<FileString> => {
  let data = ''

  data += `module.exports = {\n`
  data += `  projects: [\n`

  Object.values(info.map).forEach(({ location }) => {
    data += `    '<rootDir>/${location}/${JEST_CONFIG}',\n`
  })

  data += `  ],\n`
  data += `}\n`

  return {
    data,
    name: JEST_CONFIG,
    type: FileType.String,
    path: join(info.cwd, JEST_CONFIG),
  }
}

export const syncConfigs = async () => {
  const info = await getWorkspaceInfo()

  const p1 = syncTemplates(info)
  const p2 = syncPackages(info)
  const p3 = syncTsConfigs(info)
  const p4 = syncTsConfigsComp(info)

  const r1 = syncRootTsConfigsComp(info)
  const r2 = syncRootJestConfig(info)

  const projectFiles = (await Promise.all([p1, p2, p3, p4])).reduce((acc, arr) => [...acc, ...arr])
  const rootFiles = await Promise.all([r1, r2])

  // TODO: maybe do not read files two times....
  // but it's super important for caching composite builds
  const findChanged = async (files: FileString[]) => {
    const prevs = await Promise.all(files.map(file => tryReadFile(file.path)))

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return files.filter((file, i) => !prevs[i] || file.data !== prevs[i]!.data)
  }

  const changed = await findChanged([...rootFiles, ...projectFiles])

  await writeFiles(changed)

  const bullet = `\n\t - `

  if (changed.length) {
    const msg = `Configs synced!` + bullet + changed.map(({ path }) => path).join(bullet)
    console.log(msg)
  } else {
    console.log(`Already up to date!`)
  }
}

syncConfigs()
