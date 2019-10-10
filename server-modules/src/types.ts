export interface StringMap<T = unknown> {
  [key: string]: T
}

export interface DeepStringMap<T = unknown> {
  [key: string]: T | DeepStringMap<T>
}

/**
 * Use on GraphQL update input types
 *
 * There's slight issue of expression of ommision vs nullability
 * https://github.com/graphql/graphql-spec/issues/476
 *
 *  - omission => nothing
 *  - null => delete/null prop
 *
 * The shizzle is:
 *  - typeorm in DeepPartial in eg. set() expects `scalar | undef` on nonullable columns
 *  - graphql express optional property field as `undef | null | scalar`
 *
 * To think of it TypeScript have the same problem,
 * there is no diference between undefined and lack of property in typing (can check key in obj in runtime)
 */

export type DeepUndefined<T> = {
  [K in keyof T]: T[K] extends infer Base | null ? Base : DeepUndefined<T[K]>
}

export const deepUndef = <T>(obj: T) => obj as DeepUndefined<T>
