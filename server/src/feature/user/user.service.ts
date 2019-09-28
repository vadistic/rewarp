import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserWhereUniqueInput, UserCreateInput } from './user.dto'
import { mapFindConditions } from '../common/operators'
import { UserEntity } from '../../entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(where: UserWhereUniqueInput): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: mapFindConditions(where) })
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  async create(data: UserCreateInput): Promise<UserEntity> {
    return this.userRepository.save(this.userRepository.create(data))
  }
}
