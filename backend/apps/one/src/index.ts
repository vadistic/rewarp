import { IncomingMessage, ServerResponse } from 'http'
import { add } from '@libs/shared'

export default async function(_req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200
  res.end('' + add(1, 2))
}
