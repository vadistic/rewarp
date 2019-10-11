import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule, DatabaseService } from '../src'
import { getDatabaseModuleTestConfig } from './config'

describe('database > DatabaseService', () => {
  let db: DatabaseService
  let databaseModule: TestingModule

  const config = getDatabaseModuleTestConfig()

  beforeAll(async () => {
    databaseModule = await Test.createTestingModule({
      imports: [DatabaseModule.forRoot(config)],
    }).compile()

    db = databaseModule.get<DatabaseService>(DatabaseService)

    await db.connection.dropDatabase()
    await db.connection.synchronize()
  })

  afterAll(async () => {
    await databaseModule.close()
  })

  it('databaseService should be defined', async () => {
    expect(db).toBeInstanceOf(DatabaseService)

    expect(db.connection).toBeDefined()
    expect(db.manager).toBeDefined()
  })

  it('entityService should be defined', async () => {
    expect(db.user).toBeDefined()

    expect(db.user.entity).toBeDefined()
    expect(db.user.connection).toBeDefined()
    expect(db.user.repo).toBeDefined()
    expect(db.user.loader).toBeDefined()
  })

  it('entityService should work', async () => {
    const user = db.user.repo.create({
      name: 'Jakub Wadas',
      email: 'vadistic@gmail.com',
      password: 'strong pass',
      location: 'PL',
      timezone: 'UTC+2',
    })

    const res = await db.user.repo.save(user)

    expect(res).toHaveProperty('id')

    await db.user.repo.delete(res.id)

    const res3 = await db.user.repo.findOne(res.id)

    expect(res3).toBeUndefined()
  })
})
