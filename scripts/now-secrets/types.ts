export interface NowSecretsOptions {
  /**
   * Zeit Now API token
   *
   * @default process.env.NOW_TOKEN
   */
  token?: string
  /**
   * stage (e.g. development, staging) to namespace envs
   *
   * @default stage namespacing is omitted
   */
  stage?: string
  /**
   * custom project name fro prefix namespacing
   *
   * @default searching in now.json & package.json for name
   */
  name?: string
  /**
   * dotenv file location
   *
   * @default .env.stage or .env (without stage)
   */
  env?: string
  /**
   * path to (staged) now.json
   *
   * @default now.stage.json
   */
  json?: string
  /** log verbose? */
  verbose?: boolean
  /**
   * should synchronise dotenv with Now API?
   * @default true
   */
  syncApi?: boolean
  /**
   * should synchronise dotenv with now.json? envs
   *
   * @default true
   */
  syncJson?: boolean
  /**
   * should overwrite content of now.stage.json with now.json
   *
   * @default false
   */
  overwrite?: boolean
  /**
   * generated global typescript typings for process.env at provided path
   */
  codegen?: string
}

export interface NowSecret {
  uid: string
  name: string
  created: string
}

export interface ListSecretsResponse {
  secrets: NowSecret[]
}

export interface PackageJson {
  name: string
}

export interface NowJson {
  version?: number
  name?: string
  env?: {
    [name: string]: string
  }
}

export interface Envs {
  [key: string]: string
}
