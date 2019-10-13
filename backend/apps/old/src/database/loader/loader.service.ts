import DataLoader from 'dataloader'
import { Connection, Repository } from 'typeorm'

export class LoaderService<E> {
  constructor(private readonly dataLoader: DataLoader<string, E | undefined>) {}

  static create = <E>(entity: E) => (connection: Connection) => {
    const repository: Repository<E> = connection.getRepository((entity as unknown) as Function)

    const dataloader = new DataLoader<string, any>(async ids => {
      const res = await repository.findByIds(ids, {
        loadRelationIds: true,
      })

      return ids.map(id => res.find(entity => (entity as any).id === id))
    })

    return new LoaderService(dataloader)
  }

  async load(id: string): Promise<E | undefined> {
    return this.dataLoader.load(id)
  }

  async loadMany(ids: string[]): Promise<Array<E | undefined>> {
    return this.dataLoader.loadMany(ids)
  }
}
