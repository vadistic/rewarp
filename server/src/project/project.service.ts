import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from './project.entity'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async findOne(id: string): Promise<Project | undefined> {
    return this.projectRepo.findOne(id)
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find()
  }
}
