import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { ProjectsModule } from './projects/projects.module';
import { OpexModule } from './opex/opex.module';
import { EmployeesModule } from './employees/employees.module';
import { BudgetModule } from './budget/budget.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProfitShareModule } from './profit-share/profit-share.module';
import { QuotationsModule } from './quotations/quotations.module';
import { DisbursementsModule } from './disbursements/disbursements.module';
import { VenuePartnersModule } from './venue-partners/venue-partners.module';

@Module({
  imports: [PrismaModule, TransactionsModule, SubscribersModule, ProjectsModule, OpexModule, EmployeesModule, BudgetModule, InvoicesModule, ProfitShareModule, QuotationsModule, DisbursementsModule, VenuePartnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
