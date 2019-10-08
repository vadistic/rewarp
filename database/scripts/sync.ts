import { createConnection } from 'typeorm'
import { databaseOptions } from '../src/config'

const drop = async () => {
  const ctn = await createConnection(databaseOptions)

  await ctn.dropDatabase()
  await ctn.synchronize()

  ctn.close()

  console.log('Db dropped & synced')
}

drop()
