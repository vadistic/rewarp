import { Injectable, ProviderScope } from '@graphql-modules/di'
import { Connection, createConnection } from 'typeorm'
import {
  CONNECTION_OPTIONS,
  UserEntity,
  ClientEntity,
  ProjectEntity,
  WorkspaceEntity,
  EntryEntity,
  TagEntity,
  TagEntryXrefEntity,
  ProjectUserXrefEntity,
  WorkspaceUserXrefEntity,
} from '@rewarp/database'
import { DatabaseLoaderProvider } from './database-loader.provider'
import { EntityToolsXrefs, EntityTools, AnyClass } from './database.interfaces'
import { DatabaseUtilProvider } from './database-util.provider'

/**
 * General API for TypeORM repositories
 *
 * - this really could be more or less dynamically generated,
 *   but I'm afraid for typescript performance on crazy mapped typings
 */
@Injectable({ scope: ProviderScope.Application })
export class DatabaseProvider {
  connection!: Connection

  constructor(readonly loader: DatabaseLoaderProvider, readonly util: DatabaseUtilProvider) {}

  /**
   * Hook to be called outside app, because `graphql-modules `cannot do async DI
   * https://github.com/Urigo/graphql-modules/issues/525
   */
  async init() {
    this.connection = await createConnection(CONNECTION_OPTIONS).catch(e => {
      throw Error('DB Exception: ' + e)
    })
  }

  /**
   * Reusable lazy tools
   *
   * -`InstanceType` conversion `typeof Class => CLass` for typeorm-compatible generics
   *   https://stackoverflow.com/questions/48028287/typescript-convert-type-typeof-foo-to-foo
   *
   */
  private configure<E extends AnyClass, X = never>(entity: E, xrefObj?: X): EntityTools<InstanceType<E>, X> {
    const repo = () => this.connection.getRepository<any>(entity)
    const loader = () => this.loader.get(this.connection.getRepository<any>(entity))

    const xref = () => {
      const xrefTools = {} as EntityToolsXrefs<X>

      if (!xrefObj) {
        return xrefTools
      }

      // for each xref
      Object.entries(xrefObj).forEach(([key, val]) => {
        const sub = () => this.configure(val)

        // create dynamic nested xref tools
        Object.defineProperty(xrefTools, key, {
          get() {
            return sub()
          },
        })
      })

      return xrefTools
    }

    const tools = {
      get repo() {
        return repo()
      },
      get loader() {
        return loader()
      },
      get xref() {
        return xref()
      },
    }

    return tools
  }

  /* Entities */

  get user() {
    return this.configure(UserEntity, {
      userXproject: ProjectUserXrefEntity,
      userXworkspace: WorkspaceUserXrefEntity,
    })
  }

  get project() {
    return this.configure(ProjectEntity, { projectXuser: ProjectUserXrefEntity })
  }

  get client() {
    return this.configure(ClientEntity)
  }

  get workspace() {
    return this.configure(WorkspaceEntity, { workspaceXuser: WorkspaceUserXrefEntity })
  }

  get entry() {
    return this.configure(EntryEntity, { entryXTag: TagEntryXrefEntity })
  }

  get tag() {
    return this.configure(TagEntity, { tagXEntry: TagEntryXrefEntity })
  }
}
