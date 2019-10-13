import { createConnection } from 'typeorm'
import { TEST_CONNECTION_OPTIONS } from '../src'

describe(`database`, () => {
  it(`connects`, async () => {
    const connection = await createConnection(TEST_CONNECTION_OPTIONS)

    expect(connection.isConnected).toBeTruthy()

    connection.close()
  })
})
