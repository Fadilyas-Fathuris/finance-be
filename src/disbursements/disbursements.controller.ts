import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisbursementsService } from './disbursements.service';
import { CreateDisbursementDto } from './dto/create-disbursement.dto';
import { UpdateDisbursementDto } from './dto/update-disbursement.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Disbursements')
@Controller('disbursements')
export class DisbursementsController {
  constructor(private readonly disbursementsService: DisbursementsService) {}

  @Post()
  @ApiOperation({ summary: 'Mencatat pembayaran bagi hasil baru ke investor' })
  @ApiResponse({ status: 201, description: 'Pencatatan disbursement berhasil.' })
  create(@Body() dto: CreateDisbursementDto) {
    return this.disbursementsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua catatan pembayaran bagi hasil' })
  findAll() {
    return this.disbursementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan catatan disbursement berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.disbursementsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui catatan disbursement' })
  update(@Param('id') id: string, @Body() dto: UpdateDisbursementDto) {
    return this.disbursementsService.update(id, dto);
  }

  @Patch(':id/pay')
  @ApiOperation({ summary: 'Menandai disbursement sebagai sudah dibayar (Lunas)' })
  markAsPaid(@Param('id') id: string) {
    return this.disbursementsService.markAsPaid(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus catatan disbursement' })
  remove(@Param('id') id: string) {
    return this.disbursementsService.remove(id);
  }
}
