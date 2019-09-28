import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WorkspaceWhereUniqueInput } from './workspace.dto'
import { WorkspaceEntity } from '../../entities/workspace.entity'

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private readonly repository: Repository<WorkspaceEntity>,
  ) {}

  async findOne(where: WorkspaceWhereUniqueInput): Promise<WorkspaceEntity | undefined> {
    return this.repository.findOne(where.id)
  }

  async findMany(): Promise<WorkspaceEntity[]> {
    return this.repository.find()
  }
}
