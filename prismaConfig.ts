import { PrismaClient } from '@prisma/client'

let prisma:any;

if (process.env.NODE_ENV === 'TEST') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma