import { validate } from 'class-validator'
import { ArgumentValidationError } from 'type-graphql'
import { FindManyOptions, FindOperator, Repository, ObjectLiteral } from 'typeorm'

import { DeleteResponse } from '../../../server/delete-response.model'
import { getFindOperator } from './find-operators'
import { BaseWhereUniqueInput, BaseWhereInput } from './dto/where.input'
import { StringMap } from '../types'
import { DeleteManyResponse, IDType } from './dto/delete-response.types'

export abstract class BaseService<
  Entity extends ObjectLiteral,
  WhereUniqueInput extends BaseWhereUniqueInput,
  WhereInput extends BaseWhereInput,
  CreateInput extends ObjectLiteral,
  UpdateInput extends ObjectLiteral,
  OrderByEnum extends string,
  ID extends IDType = string
> {
  name = this.constructor.name

  // __repo to avoid naming conflict for the user
  constructor(protected readonly __repo: Repository<Entity>) {
    if (!__repo) {
      throw new Error(
        `BaseService of ${this.name} requires an injection of valid repository in super(repository) call`,
      )
    }
  }

  //

  async findOne({ where }: { where: WhereUniqueInput }): Promise<Entity | undefined> {
    console.log(`BaseService.findOne()`)

    const res = await this.__repo.findOne({ where })

    return res
  }

  //

  async find({
    where,
    orderBy,
    limit,
    offset,
    fields,
  }: {
    where?: WhereInput
    orderBy?: OrderByEnum
    limit?: number
    offset?: number
    fields?: (keyof Entity)[]
  }): Promise<Entity[]> {
    console.log(`BaseService.find()`)

    const findOptions: FindManyOptions = {}

    if (limit) {
      findOptions.take = limit
    }

    if (offset) {
      findOptions.skip = offset
    }

    if (fields) {
      // need to select ID or dataloaders will not function properly
      if (fields.indexOf('id') === -1) {
        fields.push('id')
      }

      findOptions.select = fields
    }

    if (orderBy) {
      const [attr, direction] = orderBy.split('_') as [string, 'ASC' | 'DESC']

      findOptions.order = {
        [attr]: direction,
      }
    }

    if (where) {
      findOptions.where = this.processWhereOptions(where)
    }

    return this.__repo.find(findOptions)
  }

  //

  async create({ data }: { data: CreateInput }): Promise<Entity> {
    console.log(`BaseService.create()`)

    const res = this.__repo.create(data)

    // Validate against the the data model
    // Without `skipMissingProperties`, some of the class-validator validations (like MinLength)
    // will fail if you don't specify the property
    const errors = await validate(res, { skipMissingProperties: true })

    if (errors.length) {
      throw new ArgumentValidationError(errors)
    }

    return this.__repo.save(res)
  }

  //

  async createMany({ data }: { data: CreateInput[] }): Promise<Entity[]> {
    console.log(`BaseService.createMany()`)

    const res = this.__repo.create(data)

    // Validate against the the data model
    // Without `skipMissingProperties`, some of the class-validator validations (like MinLength)
    // will fail if you don't specify the property
    for (const obj of res) {
      const errors = await validate(obj, { skipMissingProperties: true })

      if (errors.length) {
        throw new ArgumentValidationError(errors)
      }
    }

    return this.__repo.save(res)
  }

  //

  async update({ data, where }: { data: UpdateInput; where: WhereUniqueInput }): Promise<Entity> {
    console.log(`BaseService.update()`)

    // TODO:
    return {} as Promise<Entity>
  }

  //

  async updateMany({ data, where }: { data: UpdateInput; where: WhereInput }): Promise<Entity> {
    console.log(`BaseService.updateMany()`)

    // TODO:
    return {} as Promise<Entity>
  }

  //

  async delete({ where }: { where: WhereUniqueInput }): Promise<DeleteResponse> {
    console.log(`BaseService.delete()`)

    // TODO:
    return {} as Promise<DeleteResponse>
  }

  //

  async deleteMany({ where }: { where: WhereInput }): Promise<DeleteManyResponse<ID>> {
    console.log(`BaseService.deleteMany()`)

    // TODO:
    return {} as Promise<DeleteManyResponse<ID>>
  }

  //

  processWhereOptions(where: WhereInput) {
    const whereOptions: StringMap<FindOperator<any>> = {}

    for (const key of Object.keys(where)) {
      const [attr, operator] = getFindOperator(String(key), where[key as keyof WhereInput])
      whereOptions[attr] = operator
    }

    return whereOptions
  }
}
