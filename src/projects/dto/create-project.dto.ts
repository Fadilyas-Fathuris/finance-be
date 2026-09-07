import { ProjectStatus, BusinessLine } from '@prisma/client';

export class CreateProjectDto {
  name: string;
  client: string;
  type: string;
  status: ProjectStatus;
  value: number;
  paid: number;
  start: string;
  deadline: string;
  businessLine?: BusinessLine;
}
