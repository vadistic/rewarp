import { createParamDecorator } from '@nestjs/common'

export const Current = createParamDecorator((data, req) => {
  const [, , ctx] = req

  return ctx.req.user
})

export interface Current {
  userId: string
  workspaceId: string
}
