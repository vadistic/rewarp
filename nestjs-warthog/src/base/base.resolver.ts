import { DeepPartial, ObjectLiteral } from 'typeorm'
import { Resolver, Args } from '@nestjs/graphql'

import { DeleteResponseIntId, DeleteManyResponseIntId } from './dto/delete-response.types'
import { BaseService } from './base.service'
import { BaseWhereUniqueInput, BaseWhereInput } from './dto/where.input'

export type AnyBaseService = BaseService<any, any, any, any, any, any>

abstract class BaseResolver<E extends ObjectLiteral, Service extends AnyBaseService> {
  constructor(private __service: Service) {}

  async find(
    where?: any,
    orderBy?: any,
    limit?: number,
    offset?: number,
    fields?: string[],
  ): Promise<E[]> {
    return this.__service.find({ where, orderBy, limit, offset, fields })
  }

  async findOne(where: any): Promise<E> {
    return this.__service.findOne({ where })
  }

  async create(data: any): Promise<E> {
    return this.__service.create({ data })
  }

  async createMany(data: any[]): Promise<E[]> {
    return this.__service.createMany({ data })
  }

  async update(data: any, where: BaseWhereUniqueInput): Promise<E> {
    return this.__service.update({ data, where })
  }

  async updateMany(data: any, where: BaseWhereUniqueInput): Promise<E> {
    return this.__service.updateMany({ data, where })
  }

  async delete(where: any): Promise<DeleteResponseIntId> {
    return this.__service.delete({ where })
  }

  async deleteMany(where: any): Promise<DeleteManyResponseIntId> {
    return this.__service.deleteMany({ where })
  }
}
