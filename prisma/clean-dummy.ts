import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function safeDeleteTable(name: string, deleteFn: () => Promise<{ count: number }>): Promise<number | string> {
  try {
    const res = await deleteFn();
    return res.count;
  } catch (error: any) {
    if (error?.code === 'P2021' || error?.message?.includes('does not exist')) {
      return '0 (Tabel belum ada di DB)';
    }
    throw error;
  }
}

async function cleanDummyData() {
  const args = process.argv.slice(2);
  const cleanVenue = args.includes('--venue') || !args.some((a) => a.startsWith('--'));
  const cleanProfitShare = args.includes('--profit-share') || !args.some((a) => a.startsWith('--'));
  const cleanAll = !args.some((a) => a.startsWith('--'));

  console.log('🧹 [CLEANUP] Starting cleanup process...');
  console.log('🔒 [SAFETY] Account/User data (User table) will ALWAYS be PRESERVED.');

  try {
    let userCount: number | string = 'Unknown';
    try {
      userCount = await prisma.user.count();
      console.log(`ℹ️  Current User accounts in database: ${userCount}`);
    } catch (e: any) {
      if (e?.code === 'P2021' || e?.message?.includes('does not exist')) {
        console.warn('⚠️  Table User does not exist yet. Please run migration first.');
      } else {
        throw e;
      }
    }

    console.log('----------------------------------------------------');
    console.log('✨ Cleanup Progress & Summary:');

    // 1. Venue Module
    if (cleanVenue) {
      const venueSettlements = await safeDeleteTable('venueSettlement', () => prisma.venueSettlement.deleteMany({}));
      const venuePartners = await safeDeleteTable('venuePartner', () => prisma.venuePartner.deleteMany({}));
      console.log(`   - 📍 Venue Partners & Settlements         : ${venuePartners} venues (${venueSettlements} settlements)`);
    }

    // 2. Bagi Hasil (Profit Share & Investor Disbursement) Module
    if (cleanProfitShare) {
      const deductions = await safeDeleteTable('deductionItem', () => prisma.deductionItem.deleteMany({}));
      const profitPartners = await safeDeleteTable('profitSharePartner', () => prisma.profitSharePartner.deleteMany({}));
      const profitSchemes = await safeDeleteTable('profitShareScheme', () => prisma.profitShareScheme.deleteMany({}));
      const disbursements = await safeDeleteTable('investorDisbursement', () => prisma.investorDisbursement.deleteMany({}));
      console.log(`   - 💼 Skema Bagi Hasil (Profit Share)      : ${profitSchemes} skema (${profitPartners} mitra, ${deductions} potongan)`);
      console.log(`   - 💰 Pencairan Investor (Disbursement)    : ${disbursements}`);
    }

    // 3. Modul Lainnya (Hanya jika clean all)
    if (cleanAll) {
      const invoiceItems = await safeDeleteTable('invoiceItem', () => prisma.invoiceItem.deleteMany({}));
      const quotationItems = await safeDeleteTable('quotationItem', () => prisma.quotationItem.deleteMany({}));
      const quotationMilestones = await safeDeleteTable('quotationMilestone', () => prisma.quotationMilestone.deleteMany({}));

      const invoices = await safeDeleteTable('invoice', () => prisma.invoice.deleteMany({}));
      const quotations = await safeDeleteTable('quotation', () => prisma.quotation.deleteMany({}));
      const transactions = await safeDeleteTable('transaction', () => prisma.transaction.deleteMany({}));
      const opex = await safeDeleteTable('opex', () => prisma.opex.deleteMany({}));
      const employees = await safeDeleteTable('employee', () => prisma.employee.deleteMany({}));
      const projects = await safeDeleteTable('project', () => prisma.project.deleteMany({}));
      const subscribers = await safeDeleteTable('subscriber', () => prisma.subscriber.deleteMany({}));
      const budgets = await safeDeleteTable('budget', () => prisma.budget.deleteMany({}));

      console.log(`   - 💵 Transaksi Kas (Pemasukan/Pengeluaran): ${transactions}`);
      console.log(`   - 🏢 Opex (Biaya Operasional)             : ${opex}`);
      console.log(`   - 🧾 Invoices & Items                     : ${invoices} invoices (${invoiceItems} items)`);
      console.log(`   - 📁 Projects                             : ${projects}`);
      console.log(`   - 👥 Subscribers                          : ${subscribers}`);
      console.log(`   - 👷 Employees & Gaji                     : ${employees}`);
      console.log(`   - 📊 Budgets                              : ${budgets}`);
      console.log(`   - 📑 Quotations & Milestones              : ${quotations} quotations (${quotationItems} items, ${quotationMilestones} milestones)`);
    }

    console.log('----------------------------------------------------');
    console.log(`✅ User Accounts Preserved: ${userCount} users remain untouched.`);
    console.log('🎉 Cleanup process completed successfully!');
  } catch (error) {
    console.error('❌ Error during data cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

cleanDummyData();
