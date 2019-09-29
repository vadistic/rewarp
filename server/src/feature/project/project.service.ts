import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProjectWhereUniqueInput, ProjectCreateInput, ProjectWhereInput } from './project.dto'
import { ProjectEntity } from '../../entities/project.entity'
import { mapSearchOperators } from '../../common/base/search-operator'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepositpry: Repository<ProjectEntity>,
  ) {}

  async findOne(where: ProjectWhereUniqueInput): Promise<ProjectEntity | undefined> {
    return this.projectRepositpry.findOne({ id: where.id })
  }

  async findMany(where?: ProjectWhereInput[]): Promise<ProjectEntity[]> {
    return this.projectRepositpry.find({ where: mapSearchOperators(where) })
  }

  async create(data: ProjectCreateInput): Promise<ProjectEntity> {
    return this.projectRepositpry.save(this.projectRepositpry.create(data))
  }
}
