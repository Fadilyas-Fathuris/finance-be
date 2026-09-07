import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfitShareDto } from './dto/create-profit-share.dto';
import { UpdateProfitShareDto } from './dto/update-profit-share.dto';

@Injectable()
export class ProfitShareService {
  constructor(private prisma: PrismaService) {}

  async create(createProfitShareDto: CreateProfitShareDto) {
    const { partners, deductions, ...schemeData } = createProfitShareDto;

    return this.prisma.profitShareScheme.create({
      data: {
        ...schemeData,
        partners: {
          create: partners.map(p => ({
            name: p.name,
            percentage: p.percentage,
          })),
        },
        deductions: deductions ? {
          create: deductions.map(d => ({
            desc: d.desc,
            amount: d.amount,
          })),
        } : undefined,
      },
      include: {
        partners: true,
        deductions: true,
      },
    });
  }

  async findAll() {
    return this.prisma.profitShareScheme.findMany({
      include: {
        partners: true,
        deductions: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const scheme = await this.prisma.profitShareScheme.findUnique({
      where: { id },
      include: {
        partners: true,
        deductions: true,
      },
    });
    if (!scheme) throw new NotFoundException(`Skema bagi hasil dengan ID ${id} tidak ditemukan`);
    return scheme;
  }

  async update(id: string, updateProfitShareDto: UpdateProfitShareDto) {
    const { partners, deductions, ...schemeData } = updateProfitShareDto;

    return this.prisma.$transaction(async (tx) => {
      // 1. Update basic details
      await tx.profitShareScheme.update({
        where: { id },
        data: schemeData,
      });

      // 2. If partners provided, replace them
      if (partners) {
        await tx.profitSharePartner.deleteMany({
          where: { schemeId: id },
        });
        await tx.profitSharePartner.createMany({
          data: partners.map(p => ({
            schemeId: id,
            name: p.name,
            percentage: p.percentage,
          })),
        });
      }

      // 3. If deductions provided, replace them
      if (deductions) {
        await tx.deductionItem.deleteMany({
          where: { schemeId: id },
        });
        await tx.deductionItem.createMany({
          data: deductions.map(d => ({
            schemeId: id,
            desc: d.desc,
            amount: d.amount,
          })),
        });
      }

      // Return complete scheme
      return tx.profitShareScheme.findUnique({
        where: { id },
        include: {
          partners: true,
          deductions: true,
        },
      });
    });
  }

  async remove(id: string) {
    return this.prisma.profitShareScheme.delete({
      where: { id },
    });
  }
}
