import DataLoader from 'dataloader'
import { Connection, Repository } from 'typeorm'
import { Entity, IDType } from '../entity.interface'

export class LoaderService<E extends Entity> {
  constructor(private readonly dataLoader: DataLoader<IDType, E | undefined>) {}

  static create = (entity: Function) => (connection: Connection) => {
    const repository: Repository<Entity> = connection.getRepository(entity)

    const dataloader = new DataLoader<IDType, any>(async ids => {
      let res = await repository.findByIds(ids, {
        loadRelationIds: true,
      })

      return ids.map(id => res.find(entity => entity.id === id))
    })

    return new LoaderService(dataloader)
  }

  async load(id: IDType): Promise<E | undefined> {
    return this.dataLoader.load(id)
  }

  async loadMany(ids: IDType[]): Promise<Array<E | undefined>> {
    return this.dataLoader.loadMany(ids)
  }
}
