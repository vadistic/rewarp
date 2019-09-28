import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload, JwtType } from '../auth.dto'
import { CONFIG } from '../../../config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // params https://github.com/mikenicholson/passport-jwt
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG.JWT_SECRET,
    })
  }

  /*
    ! this fn interface is set in stone by @nestjs/passport

    - token is always valid based on JWT decoding
    - place for optional db call to hydrate user for ctx/req
    - or to blacklist tokens
  */

  async validate(payload: JwtPayload): Promise<any> {
    console.log('JwtStrategy.validate() called')

    // allow only access tokens
    if (payload.type !== JwtType.Access && payload.type !== JwtType.Api)
      throw new UnauthorizedException(`Not an access/api token`)

    return {
      userId: payload.sub,
      workspaceId: payload.scope,
    }
  }
}
