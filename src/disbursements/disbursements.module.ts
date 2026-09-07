import { Module } from '@nestjs/common';
import { DisbursementsService } from './disbursements.service';
import { DisbursementsController } from './disbursements.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DisbursementsController],
  providers: [DisbursementsService],
})
export class DisbursementsModule {}
