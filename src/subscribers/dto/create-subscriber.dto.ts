import { SubscriberStatus, SubscriberType, BusinessLine } from '@prisma/client';

export class CreateSubscriberDto {
  name: string;
  productName: string;
  units: number;
  status: SubscriberStatus;
  startDate: string;
  dueDate: string;
  city?: string;
  monthly: number;
  type: SubscriberType;
  quotaAmount?: number;
  businessLine?: BusinessLine;
}
