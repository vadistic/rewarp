import { Injectable } from '@nestjs/common'
import { RepositoriesService } from '../../database/repository/repositories.service'
import { WorkspaceWhereUniqueInput } from './workspace.dto'

@Injectable()
export class WorkspaceService {
  constructor(private readonly repositories: RepositoriesService) {}

  async findOne(where: WorkspaceWhereUniqueInput) {
    return this.repositories.user.findOne({ where, loadRelationIds: true })
  }

  async findMany() {
    return this.repositories.user.find({ loadRelationIds: true })
  }
}
