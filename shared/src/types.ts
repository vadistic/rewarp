/*
 * Prevent extending string union to strings
 * https://stackoverflow.com/questions/54333982/why-is-typescript-converting-string-literal-union-type-to-string-when-assigning
 */

export type Narrowable =
  | string
  | number
  | boolean
  | symbol
  | object
  | null
  | undefined
  | void
  | ((...args: unknown[]) => unknown)
  | {}

export type Literally<
  T extends V | Array<V | T> | { [k: string]: V | T },
  V extends Narrowable = Narrowable
> = T

export const literally = <
  T extends V | Array<V | T> | { [k: string]: V | T },
  V extends Narrowable
>(
  input: T,
) => input

/**
 * Enum function to create type safe immutable object map with runtime presence
 *
 */
export const Enum = <T extends string[]>(...args: T) => {
  return Object.freeze(args.reduce((acc, next) => {
    return {
      ...acc,
      [next]: next,
    }
  }, Object.create(null)) as { [P in UnionFromTuple<typeof args>]: P })
}

export type Enum<T extends object> = T[keyof T]

/**
 * Extracts union type from tuple
 */
export type UnionFromTuple<T> = T extends (infer U)[] ? U : never
