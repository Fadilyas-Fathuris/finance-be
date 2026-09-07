import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat subscriber produk baru' })
  @ApiResponse({ status: 201, description: 'Subscriber berhasil dibuat.' })
  create(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscribersService.create(createSubscriberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua daftar subscriber' })
  findAll() {
    return this.subscribersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan subscriber berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui subscriber berdasarkan ID' })
  update(@Param('id') id: string, @Body() updateSubscriberDto: UpdateSubscriberDto) {
    return this.subscribersService.update(id, updateSubscriberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus subscriber berdasarkan ID' })
  remove(@Param('id') id: string) {
    return this.subscribersService.remove(id);
  }
}
