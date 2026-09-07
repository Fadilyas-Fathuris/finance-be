import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  private readonly DEFAULT_BUDGET = {
    incomeTarget: 100000000,
    gaji: 30000000,
    server: 5000000,
    marketing: 10000000,
    operasional: 10000000,
    event: 20000000,
  };

  async findCurrent() {
    let budget = await this.prisma.budget.findFirst();
    if (!budget) {
      budget = await this.prisma.budget.create({
        data: this.DEFAULT_BUDGET,
      });
    }
    return budget;
  }

  async updateCurrent(updateBudgetDto: UpdateBudgetDto) {
    const current = await this.findCurrent();
    return this.prisma.budget.update({
      where: { id: current.id },
      data: updateBudgetDto,
    });
  }
}
