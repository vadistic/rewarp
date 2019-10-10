import { AppContext } from '../../app.interfaces'
import { Resolvers } from './user.gen.types'

export const userResolver: Resolvers<AppContext> = {
  Query: {
    user: async (root, { id }, ctx, info) => {
      const user = await ctx.db.user.repo.findOne(id)

      return user || null
    },
    users: async (root, args, ctx, info) => {
      const users = await ctx.db.user.repo.find()

      return users
    },
  },
  Mutation: {
    createUser: async (root, args, ctx, info) => {
      const user = await ctx.db.user.repo.save(ctx.db.user.repo.create(args.data))

      return user
    },
    updateUser: async (root, args, ctx, info) => {
      const fields = ctx.db.util.info(ctx.db.user.repo, info)

      const idCond = (id: string): [string, { id: string }] => ['id = :id', { id }]

      const qb = ctx.db.user.repo
        .createQueryBuilder()
        .update()
        .where(...idCond(args.id))
        .set({ ...args.data })
        .returning([...fields.columns, ...fields.relations])

      const res = await qb.execute()

      console.log(res)

      return res.raw[0]
    },
  },
}
