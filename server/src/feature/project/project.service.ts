import { Injectable } from '@nestjs/common'
import { RepositoriesService } from '../../database/repository/repositories.service'
import { getWhere } from '../../database/utils/search-operator'
import { ProjectCreateInput, ProjectWhereInput, ProjectWhereUniqueInput } from './project.dto'

@Injectable()
export class ProjectService {
  constructor(private readonly repositories: RepositoriesService) {}

  async findOne(where: ProjectWhereUniqueInput) {
    return this.repositories.project.findOne({ id: where.id })
  }

  async findMany(where?: ProjectWhereInput[]) {
    return this.repositories.project.find({ where: getWhere(where) })
  }

  async create(data: ProjectCreateInput) {
    return this.repositories.project.save(this.repositories.project.create(data))
  }
}
