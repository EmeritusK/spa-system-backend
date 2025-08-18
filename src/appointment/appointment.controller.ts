import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { Get, Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentService } from './appointment.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { UpdateCommentsDto } from './dto/update-comments.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
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

  //Actualizar comentarios de la cita
  @ApiOperation({ summary: 'Actualizar los comentarios de una cita' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la cita' })
  @ApiBody({
    type: UpdateCommentsDto,
    examples: {
      ejemplo: {
        summary: 'Ejemplo de comentarios',
        value: { comments: 'El cliente solicitó un masaje relajante' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Comentarios actualizados correctamente' })
  @Patch(':id/comments')
  updateComments(@Param('id') id: string, @Body() updateCommentsDto: UpdateCommentsDto) {
    return this.appointmentService.updateComments(+id, updateCommentsDto);
  }

  //Reprogramar cita (cambiar fecha y hora)
  @ApiOperation({ summary: 'Reprogramar una cita cambiando su fecha y hora' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la cita a reprogramar' })
  @ApiBody({
    type: RescheduleAppointmentDto,
    examples: {
      reprogramar: {
        summary: 'Ejemplo de reprogramación',
        value: { dateTime: '2024-01-20T15:30:00Z' },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cita reprogramada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Cita reprogramada exitosamente' },
        appointment: { type: 'object' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Sala no disponible en la fecha especificada' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada' })
  @Patch(':id/reschedule')
  rescheduleAppointment(@Param('id') id: string, @Body() rescheduleDto: RescheduleAppointmentDto) {
    return this.appointmentService.rescheduleAppointment(+id, rescheduleDto);
  }
}
