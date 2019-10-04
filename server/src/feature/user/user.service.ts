import { Injectable } from '@nestjs/common'
import { RepositoriesService } from '../../database/repository/repositories.service'
import { getWhere } from '../../database/utils/search-operator'
import { UserWhereInput, UserWhereUniqueInput } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly repositories: RepositoriesService) {}

  async findOne(where: UserWhereUniqueInput) {
    return this.repositories.user.findOne({ where })
  }

  async findMany(where?: UserWhereInput) {
    return this.repositories.user.find({ where: getWhere(where) })
  }
}
