import { Injectable, ProviderScope } from '@graphql-modules/di'
import { GraphQLResolveInfo, SelectionNode, FieldNode, Kind } from 'graphql'
import { Repository } from 'typeorm'
import { InfoTransformer } from './database.interfaces'

@Injectable({ scope: ProviderScope.Application })
export class DatabaseUtilProvider {
  info<E, I>(repo: Repository<E>, info: GraphQLResolveInfo, transform?: InfoTransformer<E, I>) {
    const flatten = (selections: ReadonlyArray<SelectionNode>): FieldNode[] =>
      selections.flatMap(sel => {
        if (sel.kind == Kind.FIELD) {
          return sel
        }

        if (sel.kind === Kind.INLINE_FRAGMENT) {
          return flatten(sel.selectionSet.selections)
        }

        if (sel.kind === Kind.FRAGMENT_SPREAD) {
          return flatten(info.fragments[sel.name.value].selectionSet.selections)
        }

        throw Error(`Noop. Invalid info fieldNodes`)
      })

    // allow tranforming
    const getName = (fieldname: string): string =>
      transform && fieldname in transform ? (transform as any)[fieldname] : fieldname

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const set = info.fieldNodes.find(node => node.name.value === info.fieldName)!.selectionSet
    const selections = flatten(set ? set.selections : []).map(field => getName(field.name.value))

    const columns = selections.filter(
      fieldname => !!repo.metadata.columns.find(col => col.propertyName === fieldname),
    ) as (keyof E)[]

    const relations = selections.filter(
      fieldname => !!repo.metadata.relations.find(rel => rel.propertyName === fieldname),
    ) as (keyof E)[]

    return { columns, relations }
  }
}
