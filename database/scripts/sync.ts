import { createConnection } from 'typeorm'
import { CONNECTION_OPTIONS } from '../src/config'

const drop = async () => {
  const ctn = await createConnection(CONNECTION_OPTIONS)

  await ctn.dropDatabase()
  await ctn.synchronize()

  ctn.close()

  console.log('Db dropped & synced')
}

drop()
