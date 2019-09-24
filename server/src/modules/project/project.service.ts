import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProjectEntity } from './project.entity'
import { ProjectWhereUniqueInput, ProjectCreateInput } from './project.dto'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepositpry: Repository<ProjectEntity>,
  ) {}

  async findOne(where: ProjectWhereUniqueInput): Promise<ProjectEntity | undefined> {
    return this.projectRepositpry.findOne(where.id)
  }

  async findAll(): Promise<ProjectEntity[]> {
    return this.projectRepositpry.find()
  }

  async create(data: ProjectCreateInput): Promise<ProjectEntity> {
    return this.projectRepositpry.save(this.projectRepositpry.create(data))
  }
}
