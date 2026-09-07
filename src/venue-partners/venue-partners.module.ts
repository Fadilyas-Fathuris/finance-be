import { Module } from '@nestjs/common';
import { VenuePartnersService } from './venue-partners.service';
import { VenuePartnersController } from './venue-partners.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VenuePartnersController],
  providers: [VenuePartnersService],
})
export class VenuePartnersModule {}
