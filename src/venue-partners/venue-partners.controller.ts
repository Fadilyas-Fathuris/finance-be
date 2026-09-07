import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenuePartnersService } from './venue-partners.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Venue Partners')
@Controller('venue-partners')
export class VenuePartnersController {
  constructor(private readonly venuePartnersService: VenuePartnersService) {}

  @Get()
  @ApiOperation({ summary: 'Mengambil semua data venue partners' })
  findAll() {
    return this.venuePartnersService.findAll();
  }

  @Get('settlements')
  @ApiOperation({ summary: 'Mengambil semua data riwayat settlement' })
  findAllSettlements() {
    return this.venuePartnersService.findAllSettlements();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil venue partner berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.venuePartnersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Membuat venue partner baru' })
  create(@Body() data: any) {
    return this.venuePartnersService.create(data);
  }

  @Post('settlements')
  @ApiOperation({ summary: 'Membuat pencatatan settlement transaksi bulanan baru' })
  createSettlement(@Body() data: any) {
    return this.venuePartnersService.createSettlement(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui data venue partner' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.venuePartnersService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus venue partner' })
  remove(@Param('id') id: string) {
    return this.venuePartnersService.remove(id);
  }
}
