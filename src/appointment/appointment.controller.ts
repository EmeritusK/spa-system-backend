import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { Get, Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentService } from './appointment.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }

  //Actualizar estado de asistencia
  @ApiOperation({ summary: 'Actualizar el estado de asistencia de una cita' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la cita' })
  @ApiBody({
    type: UpdateAttendanceDto,
    examples: {
      ejemplo: {
        summary: 'Ejemplo de asistencia',
        value: { attendanceStatus: 'confirmed' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Asistencia actualizada correctamente' })
  @Patch(':id/attendance')
  updateAttendance(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.appointmentService.updateAttendance(+id, updateAttendanceDto);
  }
}
