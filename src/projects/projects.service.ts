import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        client: createProjectDto.client,
        type: createProjectDto.type,
        status: createProjectDto.status as ProjectStatus,
        value: createProjectDto.value,
        paid: createProjectDto.paid,
        start: new Date(createProjectDto.start),
        deadline: new Date(createProjectDto.deadline),
        businessLine: createProjectDto.businessLine || 'niskala',
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      orderBy: { start: 'desc' },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project) throw new NotFoundException(`Project dengan ID ${id} tidak ditemukan`);
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: {
        ...updateProjectDto,
        status: updateProjectDto.status ? (updateProjectDto.status as ProjectStatus) : undefined,
        start: updateProjectDto.start ? new Date(updateProjectDto.start) : undefined,
        deadline: updateProjectDto.deadline ? new Date(updateProjectDto.deadline) : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
