import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat transaksi kas baru' })
  @ApiResponse({ status: 201, description: 'Transaksi berhasil dibuat.' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua daftar transaksi kas' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('deleted')
  @ApiOperation({ summary: 'Mengambil daftar transaksi kas yang telah dihapus (soft-deleted)' })
  findDeleted() {
    return this.transactionsService.findDeleted();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan transaksi kas berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui transaksi kas berdasarkan ID' })
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus transaksi kas berdasarkan ID (Soft Delete)' })
  remove(
    @Param('id') id: string,
    @Query('userId') userId?: string,
    @Query('reason') reason?: string,
  ) {
    return this.transactionsService.remove(id, userId, reason);
  }
}
