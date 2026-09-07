export class CreateProfitSharePartnerDto {
  name: string;
  percentage: number;
}

export class CreateDeductionItemDto {
  desc: string;
  amount: number;
}

export class CreateProfitShareDto {
  name: string;
  isAuto: boolean;
  isProductBased?: boolean;
  manualBaseAmount: number;
  productPrice?: number;
  productQty?: number;
  hppPerYear?: number;
  companyReservePct: number;
  partners: CreateProfitSharePartnerDto[];
  deductions?: CreateDeductionItemDto[];
}
