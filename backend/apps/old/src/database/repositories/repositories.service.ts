import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ClientEntity,
  EntryEntity,
  ProjectUserXrefEntity,
  ProjectEntity,
  WorkspaceRoleEntity,
  ProjectRoleEntity,
  TagEntryXrefEntity,
  TagEntity,
  UserEntity,
  WorkspaceUserXrefEntity,
  WorkspaceEntity,
} from '@libs/database'

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(ClientEntity)
    readonly client: Repository<ClientEntity>,

    @InjectRepository(EntryEntity)
    readonly entry: Repository<EntryEntity>,

    @InjectRepository(ProjectUserXrefEntity)
    readonly projectUserXref: Repository<ProjectUserXrefEntity>,

    @InjectRepository(ProjectEntity)
    readonly project: Repository<ProjectEntity>,

    @InjectRepository(WorkspaceRoleEntity)
    readonly workspaceRole: Repository<WorkspaceRoleEntity>,

    @InjectRepository(ProjectRoleEntity)
    readonly projectRole: Repository<ProjectRoleEntity>,

    @InjectRepository(TagEntryXrefEntity)
    readonly tagEntryXref: Repository<TagEntryXrefEntity>,

    @InjectRepository(TagEntity)
    readonly tag: Repository<TagEntity>,

    @InjectRepository(UserEntity)
    readonly user: Repository<UserEntity>,

    @InjectRepository(WorkspaceUserXrefEntity)
    readonly workspaceUserXref: Repository<WorkspaceUserXrefEntity>,

    @InjectRepository(WorkspaceEntity)
    readonly workspace: Repository<WorkspaceEntity>,
  ) {}
}
