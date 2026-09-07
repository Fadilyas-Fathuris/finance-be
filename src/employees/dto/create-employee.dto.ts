import { BusinessLine } from '@prisma/client';

export class CreateEmployeeDto {
  name: string;
  role: string;
  base: number;
  transport: number;
  meal: number;
  bonus: number;
  bpjsk: number;
  bpjstk: number;
  otherCut: number;
  businessLine?: BusinessLine;
}
