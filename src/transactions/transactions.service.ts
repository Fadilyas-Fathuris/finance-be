import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        category: createTransactionDto.category,
        description: createTransactionDto.description,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type as TransactionType,
        date: createTransactionDto.date ? new Date(createTransactionDto.date) : new Date(),
        receiptImage: createTransactionDto.receiptImage,
        businessLine: createTransactionDto.businessLine || 'niskala',
        createdById: createTransactionDto.createdById || null,
      },
      include: { createdBy: true, updatedBy: true },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      where: { deletedAt: null },
      include: { createdBy: true, updatedBy: true },
      orderBy: { date: 'desc' },
    });
  }

  async findDeleted() {
    return this.prisma.transaction.findMany({
      where: { NOT: { deletedAt: null } },
      include: { deletedBy: true },
      orderBy: { deletedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.transaction.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...updateTransactionDto,
        type: updateTransactionDto.type ? (updateTransactionDto.type as TransactionType) : undefined,
        date: updateTransactionDto.date ? new Date(updateTransactionDto.date) : undefined,
        updatedById: updateTransactionDto.updatedById || undefined,
      },
      include: { createdBy: true, updatedBy: true },
    });
  }

  async remove(id: string, userId?: string, reason?: string) {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedById: userId || null,
        deletionReason: reason || null,
      },
    });
  }
}
