import { createConnection, ConnectionOptions } from 'typeorm'
import { typeOrmOptions } from '../src/app.module'

import f from 'faker'
import bcrypt from 'bcrypt'
import { UserEntity } from '../src/entities/user.entity'
import { TIMEZONES } from '../src/common/timezones'
import { WorkspaceEntity } from '../src/entities/workspace.entity'
import { WorkspaceUserXrefEntity } from '../src/entities/workspace-user.xref.entity'
import { WorkspaceRoleEntity, WorkspacePermission } from '../src/entities/role.entity'

// SEED!!!
f.seed(123)

const times = <Args extends any[], Res>(num: number, fn: (...args: Args) => Res, ...args: Args) => {
  return Array.from({ length: num }).map(() => fn(...args))
}

const randomIndex = <T>(arr: T[]) => f.random.number({ min: 0, max: arr.length - 1 })

const main = async (): Promise<void> => {
  const ctn = await createConnection({
    ...typeOrmOptions,
    loggerLevel: 'error',
  } as ConnectionOptions)

  await ctn.dropDatabase()
  await ctn.synchronize()

  // CREATE USERS

  const userRepo = ctn.getRepository(UserEntity)
  const users = await userRepo.save(
    times(20, () => {
      const user = new UserEntity()

      user.name = f.name.firstName() + ' ' + f.name.lastName()
      user.password = bcrypt.hashSync('password', 6)
      user.email = f.internet.email()
      user.description = f.hacker.phrase()
      user.avatarUrl = f.internet.avatar()
      user.timezone = f.random.arrayElement(f.random.arrayElement(TIMEZONES).timezones)
      user.location = f.address.country()

      return user
    }),
  )

  // CREATE WORKSPACES

  const workspaceRepo = ctn.getRepository(WorkspaceEntity)
  const workspaces = await workspaceRepo.save(
    times(7, () => {
      const workspace = new WorkspaceEntity()

      workspace.name = f.company.bsNoun()
      workspace.description = f.lorem.sentence()

      return workspace
    }),
  )

  // DEFINE ROLES
  const workspaceRoleRepo = ctn.getRepository(WorkspaceRoleEntity)
  const workspaceRoleInstances = workspaces.map(workspace => {
    const adminRole = new WorkspaceRoleEntity()

    adminRole.tenant = workspace.id
    adminRole.name = `Admin`
    adminRole.readonly = true
    adminRole.description = `All allowed`
    adminRole.permissions = Object.values(WorkspacePermission) as WorkspacePermission[]

    const memberRole = new WorkspaceRoleEntity()

    memberRole.tenant = workspace.id
    memberRole.name = `Member`
    memberRole.readonly = true
    memberRole.description = `Limited`
    memberRole.permissions = [
      WorkspacePermission.ENTRY_ACCESS_OWN,
      WorkspacePermission.ENTRY_CREATE_OWN,
      WorkspacePermission.ENTRY_DELETE_OWN,
      WorkspacePermission.TAG_ENTRY_ACCESS,
      WorkspacePermission.TAG_ENTRY_CREATE,
      WorkspacePermission.TAG_ENTRY_DELETE,
      WorkspacePermission.TAG_ACCESS,
      WorkspacePermission.WORKSPACE_USER_ACCESS,
    ]

    workspaceRoleRepo.save([adminRole, memberRole])

    return [adminRole, memberRole]
  })

  const roles = await workspaceRoleRepo.save(workspaceRoleInstances.flat())

  // CREATE WORKSPACE USERS

  const workspaceUserXrefRepo = ctn.getRepository(WorkspaceUserXrefEntity)

  const workspaceUsers = await workspaceUserXrefRepo.save(
    times(40, () => {
      const xref = new WorkspaceUserXrefEntity()

      const workspaceIndex = randomIndex(workspaces)
      const workspace = workspaces[workspaceIndex]

      // does it work?
      const role = f.random.arrayElement(workspaceRoleInstances[workspaceIndex])

      xref.user = f.random.arrayElement(users)
      xref.workspace = workspace

      xref.tenant = workspace.id
      xref.roles = [role]

      return xref
    }),
  )

  console.log(workspaceUsers)

  await ctn.close()
}

main()
