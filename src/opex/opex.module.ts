import { Module } from '@nestjs/common';
import { OpexService } from './opex.service';
import { OpexController } from './opex.controller';

@Module({
  controllers: [OpexController],
  providers: [OpexService],
})
export class OpexModule {}
