import { BusinessLine } from '@prisma/client';

export class CreateInvoiceItemDto {
  desc: string;
  qty: number;
  price: number;
}

export class CreateInvoiceDto {
  num: string;
  client: string;
  clientAddr: string;
  date: string;
  due: string;
  notes?: string;
  bankName?: string;
  bankAccount?: string;
  bankHolder?: string;
  businessLine?: BusinessLine;
  createdById?: string;
  updatedById?: string;
  items: CreateInvoiceItemDto[];
}
