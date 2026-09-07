import { OpexFreq, BusinessLine } from '@prisma/client';

export class CreateOpexDto {
  name: string;
  cat: string;
  amount: number;
  freq: OpexFreq;
  receiptImage?: string;
  businessLine?: BusinessLine;
  createdById?: string;
  updatedById?: string;
}
