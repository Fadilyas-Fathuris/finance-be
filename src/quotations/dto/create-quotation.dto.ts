export class CreateQuotationItemDto {
  scope: string;
  publishRate: number;
  discount: number;
  details: string;
  workDays: number;
}

export class CreateQuotationMilestoneDto {
  scope: string;
  percentage: number;
}

export class CreateQuotationDto {
  client: string;
  date: string;
  categoryName: string;
  barterValue: number;
  garansiText: string;
  termsText: string;
  changeRequestText: string;
  authorizedName?: string;
  clientRepresentative?: string;
  items: CreateQuotationItemDto[];
  milestones: CreateQuotationMilestoneDto[];
}
