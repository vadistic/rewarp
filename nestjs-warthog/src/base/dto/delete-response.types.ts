export type IDType = string | number

// not type-graphql class because it's hard to switch between int and string IDs
// meant only for service res typing

export interface DeleteResponse<ID extends IDType> {
  id: ID
}

// id or ids?
export interface DeleteManyResponse<ID extends IDType> {
  id: ID[]
}
