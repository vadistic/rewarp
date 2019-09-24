import { createConnection, ConnectionOptions } from 'typeorm'
import { typeOrmOptions } from '../src/app.module'
import { UserEntity } from '../src/modules/user/user.entity'

import f from 'faker'
import bcrypt from 'bcrypt'

const genUser = (): Partial<UserEntity> => ({
  name: f.internet.userName(),
  email: f.internet.email(),
  password: bcrypt.hashSync('password', 6),
})

const main = async (): Promise<void> => {
  const ctn = await createConnection(typeOrmOptions as ConnectionOptions)
  const userRepo = ctn.getRepository(UserEntity)

  const user1 = await userRepo.save(userRepo.create(genUser()))
  const user2 = await userRepo.save(userRepo.create(genUser()))

  console.log({ user1, user2 })

  await ctn.close()
}

main()
