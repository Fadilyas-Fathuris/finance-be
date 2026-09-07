import { PartialType } from '@nestjs/swagger';
import { CreateProfitShareDto } from './create-profit-share.dto';

export class UpdateProfitShareDto extends PartialType(CreateProfitShareDto) {}
