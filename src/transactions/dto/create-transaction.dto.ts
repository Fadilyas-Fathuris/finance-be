import { TransactionType, BusinessLine } from '@prisma/client';

export class CreateTransactionDto {
  category: string;
  description: string;
  amount: number;
  type: TransactionType;
  date?: string;
  receiptImage?: string;
  businessLine?: BusinessLine;
  createdById?: string;
  updatedById?: string;
}
