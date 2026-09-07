import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';

@Injectable()
export class QuotationsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuotationDto: CreateQuotationDto) {
    const { items, milestones, ...quotationData } = createQuotationDto;

    return this.prisma.quotation.create({
      data: {
        ...quotationData,
        date: new Date(quotationData.date),
        items: {
          create: items.map(item => ({
            scope: item.scope,
            publishRate: item.publishRate,
            discount: item.discount,
            details: item.details,
            workDays: item.workDays,
          })),
        },
        milestones: {
          create: milestones.map(m => ({
            scope: m.scope,
            percentage: m.percentage,
          })),
        },
      },
      include: {
        items: true,
        milestones: true,
      },
    });
  }

  async findAll() {
    return this.prisma.quotation.findMany({
      include: {
        items: true,
        milestones: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const quotation = await this.prisma.quotation.findUnique({
      where: { id },
      include: {
        items: true,
        milestones: true,
      },
    });
    if (!quotation) throw new NotFoundException(`Quotation dengan ID ${id} tidak ditemukan`);
    return quotation;
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {
    const { items, milestones, ...quotationData } = updateQuotationDto;

    return this.prisma.$transaction(async (tx) => {
      // 1. Update basic quotation details
      await tx.quotation.update({
        where: { id },
        data: {
          ...quotationData,
          date: quotationData.date ? new Date(quotationData.date) : undefined,
        },
      });

      // 2. Update items if provided
      if (items) {
        await tx.quotationItem.deleteMany({ where: { quotationId: id } });
        await tx.quotationItem.createMany({
          data: items.map(item => ({
            quotationId: id,
            scope: item.scope,
            publishRate: item.publishRate,
            discount: item.discount,
            details: item.details,
            workDays: item.workDays,
          })),
        });
      }

      // 3. Update milestones if provided
      if (milestones) {
        await tx.quotationMilestone.deleteMany({ where: { quotationId: id } });
        await tx.quotationMilestone.createMany({
          data: milestones.map(m => ({
            quotationId: id,
            scope: m.scope,
            percentage: m.percentage,
          })),
        });
      }

      // Return complete updated object
      return tx.quotation.findUnique({
        where: { id },
        include: {
          items: true,
          milestones: true,
        },
      });
    });
  }

  async remove(id: string) {
    return this.prisma.quotation.delete({
      where: { id },
    });
  }
}
