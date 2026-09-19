import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function cleanDummyData() {
  console.log('🧹 [CLEANUP] Starting cleanup of dummy/test data...');
  console.log('🔒 [SAFETY] Account/User data (User table) will be PRESERVED.');

  try {
    const userCount = await prisma.user.count();
    console.log(`ℹ️  Current User accounts in database: ${userCount}`);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Child tables / Dependent tables first
      const deletedInvoiceItems = await tx.invoiceItem.deleteMany({});
      const deletedDeductions = await tx.deductionItem.deleteMany({});
      const deletedProfitPartners = await tx.profitSharePartner.deleteMany({});
      const deletedQuotationItems = await tx.quotationItem.deleteMany({});
      const deletedQuotationMilestones = await tx.quotationMilestone.deleteMany({});
      const deletedVenueSettlements = await tx.venueSettlement.deleteMany({});

      // 2. Parent transactional tables
      const deletedInvoices = await tx.invoice.deleteMany({});
      const deletedProfitSchemes = await tx.profitShareScheme.deleteMany({});
      const deletedQuotations = await tx.quotation.deleteMany({});
      const deletedVenuePartners = await tx.venuePartner.deleteMany({});
      const deletedDisbursements = await tx.investorDisbursement.deleteMany({});
      const deletedTransactions = await tx.transaction.deleteMany({});
      const deletedOpex = await tx.opex.deleteMany({});
      const deletedEmployees = await tx.employee.deleteMany({});
      const deletedProjects = await tx.project.deleteMany({});
      const deletedSubscribers = await tx.subscriber.deleteMany({});
      const deletedBudgets = await tx.budget.deleteMany({});

      return {
        invoiceItems: deletedInvoiceItems.count,
        invoices: deletedInvoices.count,
        profitSharePartners: deletedProfitPartners.count,
        deductionItems: deletedDeductions.count,
        profitShareSchemes: deletedProfitSchemes.count,
        quotationItems: deletedQuotationItems.count,
        quotationMilestones: deletedQuotationMilestones.count,
        quotations: deletedQuotations.count,
        venueSettlements: deletedVenueSettlements.count,
        venuePartners: deletedVenuePartners.count,
        disbursements: deletedDisbursements.count,
        transactions: deletedTransactions.count,
        opex: deletedOpex.count,
        employees: deletedEmployees.count,
        projects: deletedProjects.count,
        subscribers: deletedSubscribers.count,
        budgets: deletedBudgets.count,
      };
    });

    console.log('----------------------------------------------------');
    console.log('✨ Cleanup Summary (Deleted Dummy Records):');
    console.log(`   - Transactions (Pemasukan/Pengeluaran) : ${result.transactions}`);
    console.log(`   - Opex (Operasional)                   : ${result.opex}`);
    console.log(`   - Invoices & Invoice Items             : ${result.invoices} invoices (${result.invoiceItems} items)`);
    console.log(`   - Projects                             : ${result.projects}`);
    console.log(`   - Subscribers                          : ${result.subscribers}`);
    console.log(`   - Employees & Gaji                     : ${result.employees}`);
    console.log(`   - Budgets                              : ${result.budgets}`);
    console.log(`   - Profit Share Schemes & Partners      : ${result.profitShareSchemes} schemes (${result.profitSharePartners} partners)`);
    console.log(`   - Quotations & Milestones              : ${result.quotations} quotations (${result.quotationItems} items, ${result.quotationMilestones} milestones)`);
    console.log(`   - Venue Partners & Settlements         : ${result.venuePartners} venues (${result.venueSettlements} settlements)`);
    console.log(`   - Investor Disbursements               : ${result.disbursements}`);
    console.log('----------------------------------------------------');
    console.log(`✅ User Accounts Preserved: ${userCount} users remain untouched.`);
    console.log('🎉 Database is now clean and ready for production use!');
  } catch (error) {
    console.error('❌ Error during dummy data cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

cleanDummyData();
