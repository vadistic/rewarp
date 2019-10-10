import { deepUndef } from '../../types'
import { AppContext } from '../../app.interfaces'
import { Resolvers } from './project.gen.types'

export const projectResolver: Resolvers<AppContext> = {
  Query: {
    project: async (root, { id }, ctx, info) => {
      const project = await ctx.db.project.repo.findOne(id)

      return project || null
    },

    projects: async (root, args, ctx, info) => {
      const fields = ctx.db.util.info(ctx.db.project.repo, info)

      const projects = await ctx.db.project.repo.find({ select: fields.columns })

      console.log(projects)

      return projects
    },
  },
  Mutation: {
    createProject: async (root, args, ctx, info) => {
      args.data.name
      const project = await ctx.db.project.repo.save(ctx.db.project.repo.create(args.data))

      return project
    },

    updateProject: async (root, args, ctx, info) => {
      const fields = ctx.db.util.info(ctx.db.project.repo, info)

      const idCond = (id: string): [string, { id: string }] => ['id = :id', { id }]

      const qb = ctx.db.project.repo
        .createQueryBuilder()
        .update()
        .where(...idCond(args.id))
        .set({ ...deepUndef(args.data) })
        .returning([...fields.columns, ...fields.relations])

      const res = await qb.execute()

      console.log(res)

      return res.raw[0]
    },
  },
}
