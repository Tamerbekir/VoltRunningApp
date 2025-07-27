import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password12345', 10)

  await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: hashedPassword
    }
  })
  console.log('User seed')
}

main().catch((error => console.log(error))).finally(() => prisma.$disconnect())