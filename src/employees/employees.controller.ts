import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Menambahkan data karyawan baru' })
  @ApiResponse({ status: 201, description: 'Data karyawan berhasil ditambahkan.' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua daftar karyawan' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan data karyawan berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui data karyawan berdasarkan ID' })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus data karyawan berdasarkan ID' })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
