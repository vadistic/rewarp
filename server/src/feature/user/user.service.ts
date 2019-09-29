import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindConditions, Equal, FindOperator, Raw } from 'typeorm'
import { UserWhereUniqueInput, UserCreateInput, UserWhereInput } from './user.dto'
import { UserEntity } from '../../entities/user.entity'
import { mapSearchOperators } from '../../common/base/search-operator'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(where: UserWhereUniqueInput): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where })
  }

  async findMany(where?: UserWhereInput[]): Promise<UserEntity[]> {
    return this.userRepository.find({ where: mapSearchOperators(where) })
  }
}
