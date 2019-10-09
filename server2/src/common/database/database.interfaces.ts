import { Repository, ObjectLiteral } from 'typeorm'
import DataLoader from 'dataloader'
import { DatabaseProvider } from './database.provider'

export type EntityLoader<E = any> = DataLoader<string, E>

export interface DatabaseContext {
  db: DatabaseProvider
}

export type AnyClass = new (...args: any) => any

export interface EntityTools<E, X = never> {
  repo: Repository<E>
  loader: EntityLoader<E>
  xref: EntityToolsXrefs<X>
}

export type EntityToolsXrefs<X extends ObjectLiteral> = {
  [K in keyof X]: EntityTools<X[K]>
}

export type InfoTransformer<Entity, Input> = {
  [K in keyof Input]: keyof Entity
}
