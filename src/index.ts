import { PrismaClient } from '@prisma/client'
import express from 'express';
import router from './router';
import dotenv from 'dotenv'
dotenv.config();

const prisma = new PrismaClient()

async function main() {
    await prisma.$connect()

    const app = express();
    const port = process.env.PORT || 5000;
    app.use(express.json())
    app.use('/prisma',router)

    app.listen((port), () => {
        console.log(`Server is up on http://localhost:${port}`);
        
    })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })