import { Injectable } from '@nestjs/common'
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
import { InjectLoader } from './loader.decorator'
import { LoaderService } from './loader.service'

@Injectable()
export class LoadersService {
  constructor(
    @InjectLoader(ClientEntity)
    readonly client: LoaderService<ClientEntity>,

    @InjectLoader(EntryEntity)
    readonly entry: LoaderService<EntryEntity>,

    @InjectLoader(ProjectUserXrefEntity)
    readonly projectUserXref: LoaderService<ProjectUserXrefEntity>,

    @InjectLoader(ProjectEntity)
    readonly project: LoaderService<ProjectEntity>,

    @InjectLoader(WorkspaceRoleEntity)
    readonly workspaceRole: LoaderService<WorkspaceRoleEntity>,

    @InjectLoader(ProjectRoleEntity)
    readonly projectRole: LoaderService<ProjectRoleEntity>,

    @InjectLoader(TagEntryXrefEntity)
    readonly tagEntryXref: LoaderService<TagEntryXrefEntity>,

    @InjectLoader(TagEntity)
    readonly tag: LoaderService<TagEntity>,

    @InjectLoader(UserEntity)
    readonly user: LoaderService<UserEntity>,

    @InjectLoader(WorkspaceUserXrefEntity)
    readonly workspaceUserXref: LoaderService<WorkspaceUserXrefEntity>,

    @InjectLoader(WorkspaceEntity)
    readonly workspace: LoaderService<WorkspaceEntity>,
  ) {}
}
