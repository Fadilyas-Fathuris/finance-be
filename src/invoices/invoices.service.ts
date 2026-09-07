import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceStatus } from '@prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { items, ...invoiceData } = createInvoiceDto;

    return this.prisma.invoice.create({
      data: {
        ...invoiceData,
        status: invoiceData.status as InvoiceStatus,
        businessLine: invoiceData.businessLine || 'niskala',
        createdById: invoiceData.createdById || null,
        date: new Date(invoiceData.date),
        due: new Date(invoiceData.due),
        items: {
          create: items.map(item => ({
            desc: item.desc,
            qty: item.qty,
            price: item.price,
          })),
        },
      },
      include: { items: true, createdBy: true, updatedBy: true },
    });
  }

  async findAll() {
    return this.prisma.invoice.findMany({
      include: { items: true, createdBy: true, updatedBy: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { items: true, createdBy: true, updatedBy: true },
    });
    if (!invoice) throw new NotFoundException(`Invoice dengan ID ${id} tidak ditemukan`);
    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const { items, ...invoiceData } = updateInvoiceDto;

    // Use transaction to update safely
    return this.prisma.$transaction(async (tx) => {
      // 1. Update basic invoice details
      await tx.invoice.update({
        where: { id },
        data: {
          ...invoiceData,
          status: invoiceData.status ? (invoiceData.status as InvoiceStatus) : undefined,
          date: invoiceData.date ? new Date(invoiceData.date) : undefined,
          due: invoiceData.due ? new Date(invoiceData.due) : undefined,
          updatedById: invoiceData.updatedById || undefined,
        },
      });

      // 2. If items were passed, replace them
      if (items) {
        // Delete all existing items
        await tx.invoiceItem.deleteMany({
          where: { invoiceId: id },
        });

        // Insert new ones
        await tx.invoiceItem.createMany({
          data: items.map(item => ({
            invoiceId: id,
            desc: item.desc,
            qty: item.qty,
            price: item.price,
          })),
        });
      }

      // Return complete invoice
      return tx.invoice.findUnique({
        where: { id },
        include: { items: true, createdBy: true, updatedBy: true },
      });
    });
  }

  async remove(id: string) {
    return this.prisma.invoice.delete({
      where: { id },
    });
  }
}
