export enum PackageType {
  Libs = 'libs',
  Apps = 'apps',
}

export enum PackageCategory {
  Backend = 'backend',
  Frontend = 'frontend',
  Schared = 'frontend',
}

export interface PackageInfoBaseMap {
  [packageName: string]: PackageInfoBase
}

export interface PackageInfoBase {
  location: string
  workspaceDependencies: string[]
  mismatchedWorkspaceDependencies: string[]
}

export interface PackageInfo extends PackageInfoBase {
  type: PackageType
  category: PackageCategory
  dir: string
  configs: ConfigsMap
  name: string
}

export interface ConfigsMap {
  [filename: string]: string | undefined
}

export interface PackageInfoMap {
  [packageName: string]: PackageInfo
}

export interface WorkspaceInfo {
  cwd: string
  map: PackageInfoMap
}

export enum FileType {
  String,
  Json,
}

export interface FileString {
  type: FileType.String
  name: string
  path: string
  data: string
}

export interface FileJson {
  type: FileType.Json
  name: string
  path: string
  data: any
}

// to utils

type Narrowable = string | number | boolean | symbol | object | null | undefined | void | ((...args: any[]) => any) | {}

export const literally = <T extends V | Array<V | T> | { [k: string]: V | T }, V extends Narrowable>(t: T) => t
