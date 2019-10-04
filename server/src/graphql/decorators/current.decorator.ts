import { createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator((data, req) => {
  const [, , ctx] = req

  return ctx.req.user
})

export interface CurrentUser {
  userId: string
  workspaceId: string
}
