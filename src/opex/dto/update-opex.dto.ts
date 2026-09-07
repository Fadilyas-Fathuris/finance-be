import { PartialType } from '@nestjs/swagger';
import { CreateOpexDto } from './create-opex.dto';

export class UpdateOpexDto extends PartialType(CreateOpexDto) {}
