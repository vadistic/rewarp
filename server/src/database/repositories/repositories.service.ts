import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ClientEntity } from '../entities/client.entity'
import { EntryEntity } from '../entities/entry.entity'
import { ProjectUserXrefEntity } from '../entities/project-user.xref.entity'
import { ProjectEntity } from '../entities/project.entity'
import { ProjectRoleEntity, WorkspaceRoleEntity } from '../entities/role.entity'
import { TagEntryXrefEntity } from '../entities/tag-entry.xref.entity'
import { TagEntity } from '../entities/tag.entity'
import { UserEntity } from '../entities/user.entity'
import { WorkspaceUserXrefEntity } from '../entities/workspace-user.xref.entity'
import { WorkspaceEntity } from '../entities/workspace.entity'

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
