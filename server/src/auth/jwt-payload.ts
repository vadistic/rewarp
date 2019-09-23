export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
  //  opt
  jti?: string;
  hash?: string;
}
