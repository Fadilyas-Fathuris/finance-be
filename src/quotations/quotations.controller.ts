import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Quotations')
@Controller('quotations')
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat quotation (penawaran harga) baru' })
  @ApiResponse({ status: 201, description: 'Quotation berhasil dibuat.' })
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationsService.create(createQuotationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua daftar quotation' })
  findAll() {
    return this.quotationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail quotation berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.quotationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui quotation berdasarkan ID' })
  update(@Param('id') id: string, @Body() updateQuotationDto: UpdateQuotationDto) {
    return this.quotationsService.update(id, updateQuotationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus quotation berdasarkan ID' })
  remove(@Param('id') id: string) {
    return this.quotationsService.remove(id);
  }
}
