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
  console.log('🧹 [CLEANUP] Starting cleanup of dummy/test data...');
  console.log('🔒 [SAFETY] Account/User data (User table) will be PRESERVED.');

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

    // Deletion order (children first, then parents)
    const invoiceItems = await safeDeleteTable('invoiceItem', () => prisma.invoiceItem.deleteMany({}));
    const deductions = await safeDeleteTable('deductionItem', () => prisma.deductionItem.deleteMany({}));
    const profitPartners = await safeDeleteTable('profitSharePartner', () => prisma.profitSharePartner.deleteMany({}));
    const quotationItems = await safeDeleteTable('quotationItem', () => prisma.quotationItem.deleteMany({}));
    const quotationMilestones = await safeDeleteTable('quotationMilestone', () => prisma.quotationMilestone.deleteMany({}));
    const venueSettlements = await safeDeleteTable('venueSettlement', () => prisma.venueSettlement.deleteMany({}));

    const invoices = await safeDeleteTable('invoice', () => prisma.invoice.deleteMany({}));
    const profitSchemes = await safeDeleteTable('profitShareScheme', () => prisma.profitShareScheme.deleteMany({}));
    const quotations = await safeDeleteTable('quotation', () => prisma.quotation.deleteMany({}));
    const venuePartners = await safeDeleteTable('venuePartner', () => prisma.venuePartner.deleteMany({}));
    const disbursements = await safeDeleteTable('investorDisbursement', () => prisma.investorDisbursement.deleteMany({}));
    const transactions = await safeDeleteTable('transaction', () => prisma.transaction.deleteMany({}));
    const opex = await safeDeleteTable('opex', () => prisma.opex.deleteMany({}));
    const employees = await safeDeleteTable('employee', () => prisma.employee.deleteMany({}));
    const projects = await safeDeleteTable('project', () => prisma.project.deleteMany({}));
    const subscribers = await safeDeleteTable('subscriber', () => prisma.subscriber.deleteMany({}));
    const budgets = await safeDeleteTable('budget', () => prisma.budget.deleteMany({}));

    console.log('----------------------------------------------------');
    console.log('✨ Cleanup Summary (Deleted Dummy Records):');
    console.log(`   - Transactions (Pemasukan/Pengeluaran) : ${transactions}`);
    console.log(`   - Opex (Operasional)                   : ${opex}`);
    console.log(`   - Invoices & Invoice Items             : ${invoices} invoices (${invoiceItems} items)`);
    console.log(`   - Projects                             : ${projects}`);
    console.log(`   - Subscribers                          : ${subscribers}`);
    console.log(`   - Employees & Gaji                     : ${employees}`);
    console.log(`   - Budgets                              : ${budgets}`);
    console.log(`   - Profit Share Schemes & Partners      : ${profitSchemes} schemes (${profitPartners} partners, ${deductions} deductions)`);
    console.log(`   - Quotations & Milestones              : ${quotations} quotations (${quotationItems} items, ${quotationMilestones} milestones)`);
    console.log(`   - Venue Partners & Settlements         : ${venuePartners} venues (${venueSettlements} settlements)`);
    console.log(`   - Investor Disbursements               : ${disbursements}`);
    console.log('----------------------------------------------------');
    console.log(`✅ User Accounts Preserved: ${userCount} users remain untouched.`);
    console.log('🎉 Database dummy cleanup completed successfully!');
  } catch (error) {
    console.error('❌ Error during dummy data cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

cleanDummyData();
