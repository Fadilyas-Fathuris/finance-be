import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat invoice penagihan baru beserta itemnya' })
  @ApiResponse({ status: 201, description: 'Invoice berhasil dibuat.' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua daftar invoice' })
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail invoice berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui invoice berdasarkan ID' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus invoice berdasarkan ID' })
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
