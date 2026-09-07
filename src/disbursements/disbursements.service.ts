import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisbursementDto } from './dto/create-disbursement.dto';
import { UpdateDisbursementDto } from './dto/update-disbursement.dto';

@Injectable()
export class DisbursementsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDisbursementDto) {
    return this.prisma.investorDisbursement.create({
      data: {
        investorName: dto.investorName,
        businessLine: dto.businessLine as any,
        periodMonth: dto.periodMonth,
        periodYear: dto.periodYear,
        netProfit: dto.netProfit,
        sharePercent: dto.sharePercent,
        amount: dto.amount,
        status: (dto.status as any) || 'pending',
        paidAt: dto.paidAt ? new Date(dto.paidAt) : null,
        receiptImage: dto.receiptImage || null,
        notes: dto.notes || null,
        createdById: dto.createdById || null,
      },
    });
  }

  async findAll() {
    return this.prisma.investorDisbursement.findMany({
      orderBy: { createdAt: 'desc' },
      include: { createdBy: true },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.investorDisbursement.findUnique({
      where: { id },
      include: { createdBy: true },
    });
    if (!record) throw new NotFoundException(`Disbursement dengan ID ${id} tidak ditemukan`);
    return record;
  }

  async update(id: string, dto: UpdateDisbursementDto) {
    await this.findOne(id);
    return this.prisma.investorDisbursement.update({
      where: { id },
      data: {
        ...(dto.investorName && { investorName: dto.investorName }),
        ...(dto.businessLine && { businessLine: dto.businessLine as any }),
        ...(dto.periodMonth && { periodMonth: dto.periodMonth }),
        ...(dto.periodYear && { periodYear: dto.periodYear }),
        ...(dto.netProfit !== undefined && { netProfit: dto.netProfit }),
        ...(dto.sharePercent !== undefined && { sharePercent: dto.sharePercent }),
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.status && { status: dto.status as any }),
        ...(dto.paidAt && { paidAt: new Date(dto.paidAt) }),
        ...(dto.receiptImage !== undefined && { receiptImage: dto.receiptImage }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.investorDisbursement.delete({ where: { id } });
  }

  async markAsPaid(id: string) {
    await this.findOne(id);
    return this.prisma.investorDisbursement.update({
      where: { id },
      data: { status: 'paid', paidAt: new Date() },
    });
  }
}
