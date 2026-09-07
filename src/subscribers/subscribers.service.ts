import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscriberStatus, SubscriberType } from '@prisma/client';

@Injectable()
export class SubscribersService {
  constructor(private prisma: PrismaService) {}

  async create(createSubscriberDto: CreateSubscriberDto) {
    return this.prisma.subscriber.create({
      data: {
        name: createSubscriberDto.name,
        productName: createSubscriberDto.productName,
        units: createSubscriberDto.units,
        status: createSubscriberDto.status as SubscriberStatus,
        startDate: new Date(createSubscriberDto.startDate),
        dueDate: new Date(createSubscriberDto.dueDate),
        city: createSubscriberDto.city,
        monthly: createSubscriberDto.monthly,
        type: createSubscriberDto.type as SubscriberType,
        quotaAmount: createSubscriberDto.quotaAmount,
        businessLine: createSubscriberDto.businessLine || 'niskala',
      },
    });
  }

  async findAll() {
    return this.prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const subscriber = await this.prisma.subscriber.findUnique({
      where: { id },
    });
    if (!subscriber) throw new NotFoundException(`Subscriber dengan ID ${id} tidak ditemukan`);
    return subscriber;
  }

  async update(id: string, updateSubscriberDto: UpdateSubscriberDto) {
    return this.prisma.subscriber.update({
      where: { id },
      data: {
        ...updateSubscriberDto,
        status: updateSubscriberDto.status ? (updateSubscriberDto.status as SubscriberStatus) : undefined,
        type: updateSubscriberDto.type ? (updateSubscriberDto.type as SubscriberType) : undefined,
        startDate: updateSubscriberDto.startDate ? new Date(updateSubscriberDto.startDate) : undefined,
        dueDate: updateSubscriberDto.dueDate ? new Date(updateSubscriberDto.dueDate) : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.subscriber.delete({
      where: { id },
    });
  }
}
