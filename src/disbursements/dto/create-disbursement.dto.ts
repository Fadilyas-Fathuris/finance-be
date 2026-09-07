import { ApiProperty } from '@nestjs/swagger';

export class CreateDisbursementDto {
  @ApiProperty() investorName: string;
  @ApiProperty() businessLine: string;
  @ApiProperty() periodMonth: number;
  @ApiProperty() periodYear: number;
  @ApiProperty() netProfit: number;
  @ApiProperty() sharePercent: number;
  @ApiProperty() amount: number;
  @ApiProperty({ required: false }) status?: string;
  @ApiProperty({ required: false }) paidAt?: string;
  @ApiProperty({ required: false }) receiptImage?: string;
  @ApiProperty({ required: false }) notes?: string;
  @ApiProperty({ required: false }) createdById?: string;
}
