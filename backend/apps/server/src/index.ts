import { IncomingMessage, ServerResponse } from 'http'

export default async function(_req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200
  res.end('100')
}
