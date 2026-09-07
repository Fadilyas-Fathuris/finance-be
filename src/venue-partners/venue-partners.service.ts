import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VenuePartnersService {
  constructor(private prisma: PrismaService) {}

  private toNumber(value: any, fallback: number) {
    if (value === undefined || value === null || value === '') return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  async findAll() {
    return this.prisma.venuePartner.findMany({
      include: { settlements: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const venue = await this.prisma.venuePartner.findUnique({
      where: { id },
      include: { settlements: true },
    });
    if (!venue) throw new NotFoundException(`Venue dengan ID ${id} tidak ditemukan`);
    return venue;
  }

  async create(data: any) {
    return this.prisma.venuePartner.create({
      data: {
        name: data.name,
        location: data.location,
        type: data.type || 'static',
        contactPerson: data.contactPerson,
        phone: data.phone,
        bankName: data.bankName,
        bankAccount: data.bankAccount,
        totalTransactions: this.toNumber(data.totalTransactions, 0),
        pricePerTrx: this.toNumber(data.pricePerTrx, 35000),
        monthlyRevenue: this.toNumber(data.monthlyRevenue, 0),
        baseSharePercent: this.toNumber(data.baseSharePercent, 15),
        bonusSharePercent: this.toNumber(data.bonusSharePercent, 20),
        tierThreshold: this.toNumber(data.tierThreshold, 50),
        customSharePercent: data.schemeType === 'static'
          ? this.toNumber(data.customSharePercent ?? data.staticSharePercent, 0)
          : null,
        status: data.status || 'active',
        businessLine: data.businessLine || 'snapcala',
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.venuePartner.update({
      where: { id },
      data: {
        name: data.name,
        location: data.location,
        type: data.type,
        contactPerson: data.contactPerson,
        phone: data.phone,
        bankName: data.bankName,
        bankAccount: data.bankAccount,
        totalTransactions: data.totalTransactions !== undefined ? this.toNumber(data.totalTransactions, 0) : undefined,
        pricePerTrx: data.pricePerTrx !== undefined ? this.toNumber(data.pricePerTrx, 35000) : undefined,
        monthlyRevenue: data.monthlyRevenue !== undefined ? this.toNumber(data.monthlyRevenue, 0) : undefined,
        baseSharePercent: data.baseSharePercent !== undefined ? this.toNumber(data.baseSharePercent, 15) : undefined,
        bonusSharePercent: data.bonusSharePercent !== undefined ? this.toNumber(data.bonusSharePercent, 20) : undefined,
        tierThreshold: data.tierThreshold !== undefined ? this.toNumber(data.tierThreshold, 50) : undefined,
        customSharePercent: data.schemeType === 'static'
          ? this.toNumber(data.customSharePercent ?? data.staticSharePercent, 0)
          : data.schemeType === 'dynamic'
            ? null
            : data.customSharePercent !== undefined
              ? this.toNumber(data.customSharePercent, 0)
              : undefined,
        status: data.status,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.venuePartner.delete({
      where: { id },
    });
  }

  // ===== SETTLEMENTS =====
  async findAllSettlements() {
    return this.prisma.venueSettlement.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSettlement(data: any) {
    return this.prisma.venueSettlement.create({
      data: {
        venueId: data.venueId,
        venueName: data.venueName,
        periodMonth: data.periodMonth,
        totalTransactions: Number(data.totalTransactions),
        pricePerTrx: Number(data.pricePerTrx),
        grossRevenue: Number(data.grossRevenue),
        effectiveSharePercent: Number(data.effectiveSharePercent),
        partnerPayout: Number(data.partnerPayout),
        snapcalaNet: Number(data.snapcalaNet),
        status: data.status || 'settled',
      },
    });
  }
}
