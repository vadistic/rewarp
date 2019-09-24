import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload } from './auth.types'
import { CONSTANTS } from '../constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONSTANTS.JWT_SECRET,
    })
  }

  /*
    ! this fn interface is set in stone by @nestjs/passport

    - token is always valid based on JWT decoding
    - place to do db call to hydrate user for ctx/req
    - or to blacklist tokens
  */

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    console.log('jwt strategy validate() called')

    // const user = await this.userService.findById(id)
    // if (!user) {
    //   throw new UnauthorizedException()
    // }

    return payload
  }
}
