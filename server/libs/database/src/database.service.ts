import { Injectable } from '@nestjs/common'
import { EntityManager, Connection } from 'typeorm'
import { InjectEntityManager, InjectConnection } from '@nestjs/typeorm'
import { InjectEntityService } from './database.decorators'
import { UserEntity } from './entities'
import { EntityService } from './entity.service'

@Injectable()
export class DatabaseService {
  constructor(
    @InjectEntityManager() readonly manager: EntityManager,
    @InjectConnection() readonly connection: Connection,

    @InjectEntityService(UserEntity) readonly user: EntityService<UserEntity>,
  ) {}
}
