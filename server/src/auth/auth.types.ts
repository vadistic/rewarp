export interface JwtPayload {
  /** user id */
  sub: string
  hash: string
  iat: number
  exp: number
}
