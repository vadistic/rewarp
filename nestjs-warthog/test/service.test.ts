import { Test as TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Test, TestService, TestModule } from './fixture'
import { typeOrmOptions } from './connection'

describe('service', () => {
  let testService: TestService

  beforeEach(async () => {
    const module = await TestingModule.createTestingModule({
      imports: [TypeOrmModule.forRoot({ ...typeOrmOptions, entities: [Test] }), TestModule],
    }).compile()

    testService = module.get(TestService)
  })

  it('compiles', async () => {
    const res = await testService.update({ data: { name: 'newName' }, where: { id: '123' } })

    console.log(res)
  })
})
