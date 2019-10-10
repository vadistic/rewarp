import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Connection } from 'typeorm'

import DataLoader = require('dataloader')

@Injectable()
export class EntityService<E> {
  constructor(readonly entity: E, readonly connection: Connection) {}

  readonly repo = this.connection.getRepository<E>((this.entity as unknown) as Function)

  readonly loader = new DataLoader(async (ids: string[]) => {
    try {
      return this.repo.findByIds(ids)
    } catch (e) {
      throw new InternalServerErrorException(`DataLoader Error: ${e}`)
    }
  })
}
