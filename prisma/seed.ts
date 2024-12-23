import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const hashedPassword = await bcrypt.hash('dslkjkflewqwweopqwt', 10);

  // Create an Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@qafzah-tech.com',
      fname: 'Admin',
      lname: 'User',
      password: hashedPassword,
      active: true,
      profile: {
        create: {
          bio: 'Administrator of the system',
        },
      },
      admin: {
        create: {},
      },
    },
  });


 

  console.log({ adminUser});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
