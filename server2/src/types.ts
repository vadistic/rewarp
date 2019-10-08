export interface StringMap<T = unknown> {
  [key: string]: T
}

export interface DeepStringMap<T = unknown> {
  [key: string]: T | DeepStringMap<T>
}
