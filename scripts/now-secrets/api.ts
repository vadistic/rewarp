import { isObject } from 'util'
import { join, basename } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import dotenv from 'dotenv'
import fetch, { Response } from 'node-fetch'
import { NowSecretsOptions, ListSecretsResponse, NowSecret, PackageJson, NowJson } from './types'

// API
// https://zeit.co/docs/api#endpoints/secrets

export class NowSecretsApi {
  headers: { [key: string]: string }
  prefix: string
  projectName: string
  options: NowSecretsOptions
  envs: { [key: string]: string }
  nowJsonName: string
  nowJsonPath: string

  constructor(options: NowSecretsOptions) {
    this.options = {
      verbose: false,
      syncApi: true,
      syncJson: true,
      overwrite: false,
      ...options,
    }

    this.headers = {
      Authorization: `Bearer ${options.token}`,
      'Content-Type': 'application/json',
    }

    this.envs = this.readEnvs()

    this.projectName = this.getProjectName()
    this.prefix = this.getPrefix(this.projectName)

    this.nowJsonName = this.getNowJsonName()
    this.nowJsonPath = this.getNowJsonPath(this.nowJsonName)

    this.log(`Executing for project '${this.projectName}' with prefix '${this.prefix}'`)
  }

  /** PUBLIC */

  public async exec() {
    try {
      if (this.options.syncApi) await this.syncApi()
      if (this.options.syncJson) await this.syncJson()
    } catch (e) {
      console.error(e)
    }

    return true
  }

  /** Synchronise secrets with now */
  public async syncApi() {
    await this.clear({ staged: true })

    this.log(`Creating new now secrets...`)

    await Promise.all(
      Object.entries(this.envs).map(async ([name, value]) =>
        this.apiCreateSecret(this.formatName(name), value),
      ),
    )

    this.log(`New now secrets created!`)
  }

  /** Synchronise secrets for now.stage.json */
  public async syncJson() {
    if (this.options.overwrite) this.overwriteJsonEnvs()
    else this.updateJsonEnvs()
  }

  /** Deletes previous secrets */
  public async clear({ staged = true }) {
    this.log(`Deleting previous now secrets...`)

    const prev = await this.apiGetSecrets()
    const deduped = this.dedupeSecrets(prev, { staged })

    await Promise.all(deduped.map(async secret => this.apiDeleteSecret(secret.name)))

    this.log(`Previous now secrets deleted!`)
  }

  /** API */

  private async apiGetSecrets() {
    const res = await fetch(`https://api.zeit.co/v2/now/secrets`, {
      method: 'GET',
      headers: this.headers,
    })

    if (res.ok) {
      this.log(`GET secrets`)
      return res.json().then((res: ListSecretsResponse) => res.secrets)
    }

    throw Error(this.formatErr(res, `Cannot fetch secrets`))
  }

  private async apiDeleteSecret(name: string) {
    const res = await fetch(`https://api.zeit.co/v2/now/secrets/${name}`, {
      method: 'DELETE',
      headers: this.headers,
    })

    if (res.ok) {
      this.log(`DELETE ${name}`)
      return true
    }

    throw Error(this.formatErr(res, `Cannot delete secret ${name}`))
  }

  private async apiCreateSecret(name: string, value: string) {
    const res = await fetch(`https://api.zeit.co/v2/now/secrets`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        value,
      }),
    })

    if (res.ok) {
      this.log(`POST ${name}`)
      return true
    }

    throw Error(this.formatErr(res, `Cannot create secret ${name}`))
  }

  /** HELPER */

  /** Overwrites envs of now json with now.json + envs */
  private updateJsonEnvs() {
    let json = this.readNowJson({ staged: true })

    if (!json) {
      return this.overwriteJsonEnvs()
    }

    if (!json.env) {
      json = { ...json, env: {} }
    }

    Object.keys(this.envs).forEach(name => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      json!.env![name] = '@' + this.formatName(name)
    })

    this.writeNowJson(json)

    this.log(`Updated ${this.nowJsonName} with envs`)
  }

  /** Overwrites envs of now json with now.json + envs */
  private overwriteJsonEnvs() {
    let json = this.readNowJson({ staged: false })

    if (!json) {
      throw Error(`now.json must be present to create or overwrite ${this.nowJsonName}`)
    }

    if (!this.options.stage && !this.options.json) {
      throw Error(`provide stage or now json path to use overwrite option`)
    }

    if (!json.env) {
      json = { ...json, env: {} }
    }

    Object.keys(this.envs).forEach(name => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      json!.env![name] = '@' + this.formatName(name)
    })

    this.writeNowJson(json)

    this.log(`Overwriten ${this.nowJsonName} with now.json and envs`)
  }

  private dedupeSecrets(secrets: NowSecret[], { staged = true }) {
    return secrets.filter(({ name }) =>
      staged
        ? name.substr(0, this.prefix.length) === this.prefix
        : name.substr(0, this.projectName.length) === this.projectName,
    )
  }

  /** CONFIG */

  private getNowJsonName() {
    if (this.options.json) {
      return basename(this.options.json)
    }

    if (!this.options.stage) {
      return 'now.json'
    }

    return `now.${this.options.stage}.json`
  }

  private getNowJsonPath(nowJsonName: string) {
    if (this.options.json) {
      return this.options.json
    }

    return join(process.cwd(), nowJsonName)
  }

  private getPrefix(projectName: string) {
    let res = projectName + '-'

    if (this.options.stage) {
      res += this.options.stage + '-'
    }

    return res.toLowerCase().replace('_', '-')
  }

  private getProjectName() {
    if (this.options.name) return this.options.name

    const nowJson = this.readNowJson({ staged: true }) || this.readNowJson({ staged: false })
    const pkgJson = this.readPkgJson()

    if (!(nowJson && nowJson.name) && !(pkgJson && pkgJson.name)) {
      throw Error(`Could not determine project name from args, package.json or now.json`)
    }

    return ((nowJson && nowJson.name) || (pkgJson && pkgJson.name)) as string
  }

  /** READ-WRITE */

  private readPkgJson(): PackageJson | undefined {
    try {
      const file = readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
      return JSON.parse(file)
    } catch {
      return undefined
    }
  }

  private readNowJson({ staged = true }): NowJson | undefined {
    const path = staged ? this.nowJsonPath : join(process.cwd(), 'now.json')

    try {
      return JSON.parse(readFileSync(path, 'utf-8'))
    } catch {
      return undefined
    }
  }

  private writeNowJson(data: unknown) {
    return writeFileSync(this.nowJsonPath, JSON.stringify(data, null, 2))
  }

  private readEnvs() {
    const path = this.options.env || this.options.stage ? `.env.${this.options.stage}` : '.env'

    const { parsed, error } = dotenv.config({ path })

    if (error) throw error
    if (!parsed || (isObject(parsed) && Object.keys(parsed).length === 0))
      throw Error(`Could not find envs in ${path}`)

    this.log(`Envs read from ${path}`)

    return parsed
  }

  /** FORMAT */

  private formatName(name: string) {
    return this.prefix + name.toLowerCase().replace('_', '-')
  }

  private formatErr(res: Response, msg?: string) {
    return `${msg} (${res.status}: ${res.statusText})`
  }

  /** LOG */

  private log(...msgs: unknown[]) {
    if (this.options.verbose) console.log(...msgs)
  }
}
