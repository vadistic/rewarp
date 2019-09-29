export interface StringMap<T> {
  [key: string]: T
}

export interface DeepStringMap<T> {
  [key: string]: T | DeepStringMap<T>
}

export type KeysOfUnion<T> = T extends any ? keyof T : never

export type NonUndefined<T> = T extends undefined ? never : T
export type NonNull<T> = T extends null ? never : T

export const isNonUndef = <T>(input: T): input is NonUndefined<T> => input !== undefined
export const isNonNull = <T>(input: T): input is NonNull<T> => input !== null
export const isNonNullable = <T>(input: T): input is NonNullable<T> =>
  input !== undefined && input !== null

/**
 * false on non-objects
 */
export const isNonEmpty = <T>(input: T) => {
  if (typeof input !== 'object') {
    return false
  }

  for (const val of input as any) {
    return true
  }

  return false
}
