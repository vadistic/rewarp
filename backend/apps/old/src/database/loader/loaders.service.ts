import { Injectable } from '@nestjs/common'
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
