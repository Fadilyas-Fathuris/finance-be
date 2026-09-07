import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfitShareService } from './profit-share.service';
import { CreateProfitShareDto } from './dto/create-profit-share.dto';
import { UpdateProfitShareDto } from './dto/update-profit-share.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Profit Share')
@Controller('profit-share')
export class ProfitShareController {
  constructor(private readonly profitShareService: ProfitShareService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat skema bagi hasil baru' })
  @ApiResponse({ status: 201, description: 'Skema bagi hasil berhasil dibuat.' })
  create(@Body() createProfitShareDto: CreateProfitShareDto) {
    return this.profitShareService.create(createProfitShareDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua skema bagi hasil' })
  findAll() {
    return this.profitShareService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan skema bagi hasil berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.profitShareService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui skema bagi hasil berdasarkan ID' })
  update(@Param('id') id: string, @Body() updateProfitShareDto: UpdateProfitShareDto) {
    return this.profitShareService.update(id, updateProfitShareDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus skema bagi hasil berdasarkan ID' })
  remove(@Param('id') id: string) {
    return this.profitShareService.remove(id);
  }
}
