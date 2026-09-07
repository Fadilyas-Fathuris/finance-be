import { BusinessLine, InvoiceStatus } from '@prisma/client';

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
  status: InvoiceStatus;
  notes?: string;
  businessLine?: BusinessLine;
  createdById?: string;
  updatedById?: string;
  items: CreateInvoiceItemDto[];
}
