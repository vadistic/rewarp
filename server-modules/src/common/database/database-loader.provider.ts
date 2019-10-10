import { Injectable, ProviderScope } from '@graphql-modules/di'
import DataLoader from 'dataloader'
import { UserInputError } from 'apollo-server'
import { Repository } from 'typeorm'
import { EntityLoader } from './database.interfaces'

/**
 * Create and cache dataloaders
 *
 * - nice request scoping
 */
@Injectable({ scope: ProviderScope.Request })
export class DatabaseLoaderProvider {
  loaderMap: Map<string, EntityLoader<any>> = new Map()

  /** lazyinits & cache dataloaders */
  get<E>(repo: Repository<E>): EntityLoader<E> {
    const name = repo.metadata.targetName
    const cachedLoader = this.loaderMap.get(name)

    if (cachedLoader) {
      return cachedLoader
    }

    const newLoader = this.create(repo)

    this.loaderMap.set(name, newLoader)

    return newLoader
  }

  /** create dataloader for entity */
  create(repo: Repository<any>) {
    return new DataLoader(async (ids: string[]) => {
      try {
        return repo.findByIds(ids)
      } catch (e) {
        throw new UserInputError(`Invalid IDs. ${e}`)
      }
    })
  }
}
