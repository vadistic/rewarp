// https://tools.ietf.org/html/rfc7519#section-4

export interface JwtPayload {
  sub: string
  type: JwtType
  scope?: string
  jti?: number
  iat: number
  exp: number
}

export enum JwtType {
  Api = 'api',
  Refresh = 'refresh',
  Access = 'access',
}
