import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Workspace } from './workspace.entity'

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly repository: Repository<Workspace>,
  ) {}

  async read(id: string): Promise<Workspace | undefined> {
    return this.repository.findOne(id)
  }

  async readMany(): Promise<Workspace[]> {
    return this.repository.find()
  }
}
