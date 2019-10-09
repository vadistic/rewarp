// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv'
import { NowSecretsApi } from './api'

//  MAGIC STRINGS
const envMain = config()

const TOKEN = envMain.parsed && envMain.parsed.NOW_TOKEN

const ENV_FILES = {
  development: '.env.development',
  test: '.env.testing',
  production: '.env.production',
}

type NodeEnv = 'development' | 'test' | 'production'

// CLI

export async function cli() {
  // check token
  if (!TOKEN) {
    throw Error(`Cannot find Now Api token`)
  }

  // determine stage with cli
  const flagIndex = process.argv.findIndex(arg => arg === '--stage')
  const stage = flagIndex !== -1 ? (process.argv[flagIndex + 1] as NodeEnv) : 'development'

  if (!['testing', 'production', 'development'].includes(stage)) throw Error(`Invalid argv --stage ${stage}`)

  // use NowSecrets

  const api = new NowSecretsApi({
    token: TOKEN,
    stage,
    verbose: true,
    env: ENV_FILES[stage],
    syncJson: true,
    overwrite: true,
    codegen: 'types/env.d.ts',
  })

  await api.exec()
}
