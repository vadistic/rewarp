import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import express from 'express'
import { ExpressAdapter } from '@nestjs/platform-express'
import dotenv from 'dotenv'

dotenv.config({ path: join(process.cwd(), '../.env.development') })

import { AppModule } from './app.module'

async function bootstrap() {
  const instance = express()
  const adapter = new ExpressAdapter(instance)
  const app = await NestFactory.create(AppModule, adapter)

  await app.listen(3000)
}
bootstrap()
