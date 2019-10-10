import { IncomingMessage, ServerResponse } from 'http';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { from } from 'rxjs';

import { AppModule } from './app.module';

async function bootstrap() {
  const instance = express();
  const adapter = new ExpressAdapter(instance);
  const app = await NestFactory.create(AppModule, adapter);

  app.setGlobalPrefix('/test');

  await app.init();

  return instance;
}

// Observable for cold start
const server = from(bootstrap());

export default async function serverless(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const handler = await server.toPromise();

  // tslint:disable-next-line: no-console
  console.log('INVOCATION');

  return handler(req, res);
}
