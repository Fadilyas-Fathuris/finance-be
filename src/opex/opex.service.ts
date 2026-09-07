import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpexDto } from './dto/create-opex.dto';
import { UpdateOpexDto } from './dto/update-opex.dto';
import { OpexFreq } from '@prisma/client';

@Injectable()
export class OpexService {
  constructor(private prisma: PrismaService) {}

  async create(createOpexDto: CreateOpexDto) {
    return this.prisma.opex.create({
      data: {
        name: createOpexDto.name,
        cat: createOpexDto.cat,
        amount: createOpexDto.amount,
        freq: createOpexDto.freq as OpexFreq,
        receiptImage: createOpexDto.receiptImage,
        businessLine: createOpexDto.businessLine || 'global',
        createdById: createOpexDto.createdById || null,
      },
      include: { createdBy: true, updatedBy: true },
    });
  }

  async findAll() {
    return this.prisma.opex.findMany({
      where: { deletedAt: null },
      include: { createdBy: true, updatedBy: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findDeleted() {
    return this.prisma.opex.findMany({
      where: { NOT: { deletedAt: null } },
      include: { deletedBy: true },
      orderBy: { deletedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const opex = await this.prisma.opex.findFirst({
      where: { id, deletedAt: null },
    });
    if (!opex) throw new NotFoundException(`OPEX dengan ID ${id} tidak ditemukan`);
    return opex;
  }

  async update(id: string, updateOpexDto: UpdateOpexDto) {
    return this.prisma.opex.update({
      where: { id },
      data: {
        ...updateOpexDto,
        freq: updateOpexDto.freq ? (updateOpexDto.freq as OpexFreq) : undefined,
        updatedById: updateOpexDto.updatedById || undefined,
      },
      include: { createdBy: true, updatedBy: true },
    });
  }

  async remove(id: string, userId?: string, reason?: string) {
    return this.prisma.opex.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedById: userId || null,
        deletionReason: reason || null,
      },
    });
  }
}
