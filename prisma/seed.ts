import 'dotenv/config';
import { randomBytes, scryptSync } from 'crypto';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
};

async function main() {
  console.log('Seeding database with default users and roles...');

  const defaultPassword = process.env.SEED_DEFAULT_PASSWORD;
  if (!defaultPassword && process.env.NODE_ENV === 'production') {
    throw new Error('SEED_DEFAULT_PASSWORD must be defined in environment variables when seeding in production!');
  }

  const fallbackPassword = defaultPassword || 'devpassword123';

  if (!defaultPassword) {
    console.warn('⚠️  WARNING: SEED_DEFAULT_PASSWORD not found in environment variables. Using fallback password for local development ("devpassword123").');
  }

  const users = [
    {
      email: process.env.SEED_CEO_EMAIL || 'ceo@niskala.id',
      password: process.env.SEED_CEO_PASSWORD || fallbackPassword,
      name: 'Faris',
      role: 'CEO',
    },
    {
      email: process.env.SEED_CFO_EMAIL || 'cfo@niskala.id',
      password: process.env.SEED_CFO_PASSWORD || fallbackPassword,
      name: 'Fadilyas',
      role: 'CFO',
    },
    {
      email: process.env.SEED_MANAGER_NISKALA_EMAIL || 'manager.niskala@niskala.id',
      password: process.env.SEED_MANAGER_PASSWORD || fallbackPassword,
      name: 'Manager Niskala',
      role: 'MANAGER',
    },
    {
      email: process.env.SEED_MANAGER_AKSALAB_EMAIL || 'manager.aksalab@niskala.id',
      password: process.env.SEED_MANAGER_PASSWORD || fallbackPassword,
      name: 'Manager Aksalab',
      role: 'MANAGER',
    },
    {
      email: process.env.SEED_MANAGER_SNAPCALA_EMAIL || 'manager.snapcala@niskala.id',
      password: process.env.SEED_MANAGER_PASSWORD || fallbackPassword,
      name: 'Manager Snapcala',
      role: 'MANAGER',
    },
    {
      email: process.env.SEED_STAFF_NISKALA_EMAIL || 'staff.niskala@niskala.id',
      password: process.env.SEED_STAFF_PASSWORD || fallbackPassword,
      name: 'Staff Niskala',
      role: 'STAFF',
    },
    {
      email: process.env.SEED_STAFF_AKSALAB_EMAIL || 'staff.aksalab@niskala.id',
      password: process.env.SEED_STAFF_PASSWORD || fallbackPassword,
      name: 'Staff Aksalab',
      role: 'STAFF',
    },
    {
      email: process.env.SEED_STAFF_SNAPCALA_EMAIL || 'staff.snapcala@niskala.id',
      password: process.env.SEED_STAFF_PASSWORD || fallbackPassword,
      name: 'Staff Snapcala',
      role: 'STAFF',
    },
  ];

  for (const u of users) {
    const passwordHash = hashPassword(u.password);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        role: u.role as any,
        // Do not update passwordHash on existing users to prevent resetting user-changed passwords
      },
      create: {
        email: u.email,
        passwordHash,
        name: u.name,
        role: u.role as any,
      },
    });
    console.log(`Upserted user: ${user.name} (${user.email}) [Role: ${user.role}]`);
  }

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
