/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import { ConnectionOptions, Column, Entity } from 'typeorm'

import { Field, ObjectType } from 'type-graphql'

import { Base } from '../src/common/base/base.entity'

@Entity()
@ObjectType()
export class TestEntity extends Base {
  @Field()
  @Column('text')
  name!: string

  @Column('boolean')
  hidden!: boolean

  prototype: any
}

const typeOrmOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? +process.env.PGPORT : 5432,
  username: process.env.PGUSER || 'root',
  password: process.env.PGPASSWORD || 'root',
  database: process.env.PGDATABASE || 'test',
  schema: process.env.PGSCHEMA || 'public',
  // js needed to work after compilation...
  entities: [TestEntity],
  synchronize: true,
  logging: 'all',
  // ssl needed for heroku
  ssl: true,
}

const main = async (): Promise<void> => {
  console.log(TestEntity)

  const instance = new TestEntity()
  console.log(instance)

  for (const key in instance.prototype) {
    console.log(key)

    console.log(Reflect.getMetadata(key, TestEntity))
  }
}

main()
