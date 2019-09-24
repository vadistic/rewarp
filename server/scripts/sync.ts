import { createConnection, ConnectionOptions } from 'typeorm'
import { typeOrmOptions } from '../src/app.module'

const drop = async () => {
  const ctn = await createConnection(typeOrmOptions as ConnectionOptions)

  await ctn.dropDatabase()
  await ctn.synchronize()

  ctn.close()

  console.log('Db dropped & synced')
}

drop()
