import { ConnectionOptions, createConnection } from 'typeorm'

import { SchemaGenerator } from '../src/schema/generator'
import { Test } from './fixture'
import { typeOrmOptions } from './connection'

describe('schema', () => {
  it('generate type-graphql inputs/args', async () => {
    const ctn = await createConnection({
      ...(typeOrmOptions as ConnectionOptions),
      entities: [Test],
    })

    const schema = SchemaGenerator.generate(ctn.entityMetadatas)

    ctn.close()
    console.log(schema)
  })
})
