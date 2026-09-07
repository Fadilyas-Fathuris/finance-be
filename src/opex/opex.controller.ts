import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OpexService } from './opex.service';
import { CreateOpexDto } from './dto/create-opex.dto';
import { UpdateOpexDto } from './dto/update-opex.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Opex')
@Controller('opex')
export class OpexController {
  constructor(private readonly opexService: OpexService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat biaya operasional (opex) baru' })
  @ApiResponse({ status: 201, description: 'Biaya operasional berhasil dibuat.' })
  create(@Body() createOpexDto: CreateOpexDto) {
    return this.opexService.create(createOpexDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua daftar biaya operasional' })
  findAll() {
    return this.opexService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan biaya operasional berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.opexService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui biaya operasional berdasarkan ID' })
  update(@Param('id') id: string, @Body() updateOpexDto: UpdateOpexDto) {
    return this.opexService.update(id, updateOpexDto);
  }

@Get('deleted')
  @ApiOperation({ summary: 'Mengambil semua daftar biaya operasional yang dihapus (soft-deleted)' })
  findDeleted() {
    return this.opexService.findDeleted();
  }
}
