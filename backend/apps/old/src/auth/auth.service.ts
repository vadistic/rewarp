import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { CONFIG } from '../config/config'
import { RepositoriesService } from '../database/repositories/repositories.service'
import { JwtPayload, JwtType } from './auth.dto'
import { AuthPayload } from './auth.model'

/* eslint-disable @typescript-eslint/camelcase */

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly repos: RepositoriesService) {}

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = await this.repos.user.findOne({ where: { email } })

    if (!user) throw new UnauthorizedException(`Invalid credentials`)

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) throw new UnauthorizedException(`Invalid credentials`)

    const accessToken = this.createToken(user.id, JwtType.Access)
    const refreshToken = this.createToken(user.id, JwtType.Refresh)

    return {
      token_type: 'Bearer',
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async refresh(token: string): Promise<AuthPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token).catch(() => undefined)

    if (!payload || payload.type !== JwtType.Refresh) throw new UnauthorizedException(`Invalid token`)

    const user = await this.repos.user.findOne({ where: { id: payload.sub } })

    if (!user) throw new UnauthorizedException(`Invalid token`)

    const accessToken = this.createToken(payload.sub, JwtType.Access)

    return {
      token_type: 'Bearer',
      access_token: accessToken,
    }
  }

  private createToken(sub: string, type: JwtType): string {
    const payload: Partial<JwtPayload> = {
      sub,
      type,
    }

    if (type === JwtType.Access)
      return this.jwtService.sign(payload, {
        expiresIn: CONFIG.JWT_ACCESS_EXPIRE,
      })

    if (type === JwtType.Refresh)
      return this.jwtService.sign(payload, {
        expiresIn: CONFIG.JWT_ACCESS_EXPIRE,
      })

    // if (type === JwtType.Api)
    return this.jwtService.sign(payload)
  }
}
