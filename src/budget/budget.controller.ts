import { Controller, Get, Patch, Body } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Budget')
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan target & alokasi anggaran aktif saat ini' })
  findCurrent() {
    return this.budgetService.findCurrent();
  }

  @Patch()
  @ApiOperation({ summary: 'Memperbarui target & alokasi anggaran aktif saat ini' })
  @ApiResponse({ status: 200, description: 'Anggaran berhasil diperbarui.' })
  updateCurrent(@Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.updateCurrent(updateBudgetDto);
  }
}
