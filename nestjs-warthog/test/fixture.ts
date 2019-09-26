import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm'
import { Injectable, Module } from '@nestjs/common'
import { BaseService } from '../src/base/base.service'
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm'

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 500 })
  name!: string

  @Column('text')
  description!: string

  @Column()
  filename!: string

  @Column('int')
  views!: number

  @Column()
  isPublished!: boolean
}

// this should be generated
@Injectable()
export class TestBaseService extends BaseService<Test, any, any, any, any, any> {
  constructor(protected readonly __repo: Repository<Test>) {
    super(__repo)
  }
}

export class TestService extends TestBaseService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {
    super(testRepository)
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  providers: [TestBaseService],
})
export class TestModule {}
