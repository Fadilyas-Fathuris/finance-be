import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  private calculateThp(dto: {
    base: number;
    transport: number;
    meal: number;
    bonus: number;
    bpjsk: number;
    bpjstk: number;
    otherCut: number;
  }): number {
    return (dto.base + dto.transport + dto.meal + dto.bonus) - (dto.bpjsk + dto.bpjstk + dto.otherCut);
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const thp = this.calculateThp(createEmployeeDto);
    return this.prisma.employee.create({
      data: {
        ...createEmployeeDto,
        thp,
      },
    });
  }

  async findAll() {
    return this.prisma.employee.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });
    if (!employee) throw new NotFoundException(`Karyawan dengan ID ${id} tidak ditemukan`);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    // If updating, we must merge existing data with the update to re-calculate THP properly
    const existing = await this.findOne(id);
    const merged = {
      base: updateEmployeeDto.base ?? Number(existing.base),
      transport: updateEmployeeDto.transport ?? Number(existing.transport),
      meal: updateEmployeeDto.meal ?? Number(existing.meal),
      bonus: updateEmployeeDto.bonus ?? Number(existing.bonus),
      bpjsk: updateEmployeeDto.bpjsk ?? Number(existing.bpjsk),
      bpjstk: updateEmployeeDto.bpjstk ?? Number(existing.bpjstk),
      otherCut: updateEmployeeDto.otherCut ?? Number(existing.otherCut),
    };
    const thp = this.calculateThp(merged);

    return this.prisma.employee.update({
      where: { id },
      data: {
        ...updateEmployeeDto,
        thp,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
