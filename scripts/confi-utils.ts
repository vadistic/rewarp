import { join, basename, relative } from 'path'
import fs from 'fs-extra'
import execa from 'execa'
import {
  WorkspaceInfo,
  FileString,
  PackageType,
  PackageCategory,
  PackageInfoMap,
  PackageInfoBaseMap,
  FileJson,
  PackageInfo,
  FileType,
  PackageInfoBase,
  ConfigsMap,
} from './types'
import { TEMPLATES, TEMPLATES_INHERITABLE, TSCONFIG_COMP } from './config-constants'

// WORKSPACE

const getWorkSpaceCwd = async (cwd = process.cwd(), levels = 5): Promise<string> => {
  if (levels < 0) {
    throw Error(`getWorkSpaceCwd: cannot find yarn workspace root`)
  }
  try {
    const pkg = await fs.readJson(join(cwd, 'package.json'))

    if (pkg && pkg.workspaces) {
      return cwd
    }
  } catch (e) {
    // noop
  }

  return getWorkSpaceCwd(join(cwd, '..'), levels - 1)
}

const getParentConfigPath = async (
  name: string,
  from: string,
  cwd: string,
  rel = '..',
): Promise<string | undefined> => {
  if (!TEMPLATES_INHERITABLE.includes(name)) {
    return undefined
  }

  try {
    const path = join(from, rel, name)
    const stat = await fs.stat(path)

    if (stat.isFile()) {
      return join(rel, name)
    }
  } catch (e) {
    // noop
  }

  if (join(from, rel) === cwd) {
    return undefined
  }

  // search higher
  return getParentConfigPath(name, from, cwd, join(rel, '..'))
}

const getPackageMeta = async (cwd: string, base: PackageInfoBase) => {
  const type = basename(join(base.location, '..')) as PackageType
  const category = basename(join(base.location, '../..')) as PackageCategory
  const dir = join(cwd, base.location)
  const name = `@${type}/${basename(dir)}`

  if (!Object.values(PackageType).includes(type)) {
    throw Error(`getPackageType: invalid type: ${type}`)
  }

  if (!Object.values(PackageCategory).includes(category)) {
    throw Error(`getPackageType: invalid category: ${type}`)
  }

  const p = Object.values(TEMPLATES).map(async name => ({ name, path: await getParentConfigPath(name, dir, cwd) }))

  const configs = (await Promise.all(p)).reduce((acc, { name, path }) => ({ ...acc, [name]: path }), {} as ConfigsMap)

  return {
    type,
    name,
    category,
    dir,
    configs,
  }
}

export const getWorkspaceInfo = async (): Promise<WorkspaceInfo> => {
  const cwd = await getWorkSpaceCwd()
  const { stdout } = await execa('yarn', ['workspaces', 'info', '--json'])
  const { data } = JSON.parse(stdout)

  if (!data) {
    throw Error(`getWorkspaceInfo: cannot get workspace info from yarn`)
  }

  // it's double jsoned...
  const baseMap: PackageInfoBaseMap = JSON.parse(data)

  const bases = Object.entries(baseMap)
    // ignore non semantically nested packages like scripts
    .filter(([, { location }]) => location.split('/').length > 2)

  const metas = await Promise.all(bases.map(([, base]) => getPackageMeta(cwd, base)))

  const map = bases.reduce(
    (acc, [name, base], i) => ({ ...acc, [name]: { ...base, ...metas[i] } }),
    {} as PackageInfoMap,
  )

  return {
    cwd,
    map,
  }
}

// PATHS

export const getTemplatePath = (name: string) => join(__dirname, 'templates', name)

export const replaceTemplateTokens = (from: PackageInfo, file: FileString): FileString => {
  const parentReplacer = () => {
    const rel = from.configs[file.name]

    if (!rel) {
      throw Error(`Cannot locate parent of ${file.name} in ${from.location}`)
    }

    return rel
  }

  return {
    ...file,
    data: file.data.replace(/__parent__/g, parentReplacer).replace(/__name__/g, from.name),
  }
}

export const getCompilerPaths = (fromDir: string, deps: string[], info: WorkspaceInfo) => {
  const targets = Object.entries(info.map).filter(([name]) => deps.includes(name))

  return targets.reduce(
    (acc, [name, target]) => {
      const rel = join(relative(fromDir, target.dir), 'src')

      return { ...acc, [name]: [rel], [name + '/*']: [rel + '/*'] }
    },
    {} as any,
  )
}

export const getReferencePaths = (fromDir: string, deps: string[], info: WorkspaceInfo) => {
  const targets = Object.entries(info.map).filter(([name]) => deps.includes(name))

  return targets.map(([, target]) => ({ path: join(relative(fromDir, target.dir), TSCONFIG_COMP) }))
}

// FS

export const readFile = async (path: string): Promise<FileString> => {
  let data: any

  try {
    data = await fs.readFile(path, 'utf-8')
  } catch (e) {
    throw Error(`${readFile.name}: cannot read ${path}`)
  }

  return {
    type: FileType.String,
    name: basename(path),
    data,
    path,
  }
}

export const tryReadFile = async (path: string): Promise<FileString | undefined> => {
  let data: any

  try {
    data = await fs.readFile(path, 'utf-8')
  } catch (e) {
    return undefined
  }

  return {
    type: FileType.String,
    name: basename(path),
    data,
    path,
  }
}

export const writeFile = async (file: FileString): Promise<FileString> => {
  try {
    await fs.writeFile(file.path, file.data)
  } catch (e) {
    throw Error(`${writeFile.name}: cannot wrtie ${file.path}`)
  }

  return file
}

export const parseFileJson = (file: FileString): FileJson => {
  return {
    ...file,
    type: FileType.Json,
    data: JSON.parse(file.data),
  }
}

export const stringifyFileJson = (file: FileJson): FileString => {
  return {
    ...file,
    type: FileType.String,
    data: JSON.stringify(file.data, null, 2),
  }
}

export const writeFileJson = async (file: FileJson): Promise<FileString> => writeFile(stringifyFileJson(file))

export const readFileJson = async (path: string): Promise<FileJson> => parseFileJson(await readFile(path))

export const readFiles = async (paths: string[]): Promise<FileString[]> => Promise.all(paths.map(readFile))

export const readTemplateFile = async (name: string): Promise<FileString> => readFile(getTemplatePath(name))

export const readTemplateFileJson = async (name: string): Promise<FileJson> =>
  parseFileJson(await readTemplateFile(name))

export const readTemplateFiles = (names: string[]): Promise<FileString[]> =>
  Promise.all(names.map(name => readFile(getTemplatePath(name))))

export const writeFiles = (files: (FileString | FileJson)[]) =>
  Promise.all(files.map(file => (file.type === FileType.String ? writeFile(file) : writeFileJson(file))))
