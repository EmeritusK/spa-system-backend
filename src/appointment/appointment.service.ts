import { Injectable, BadRequestException } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Client } from '../client/entities/client.entity';
import { Room } from '../room/entities/room.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { UpdateCommentsDto } from './dto/update-comments.dto';
import { NoAttendanceStatus } from './enums/attendance_status.enum';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { roomId, clientId, ...rest } = createAppointmentDto;

    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new BadRequestException('El cliente no existe');
    }

    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new BadRequestException('La sala no existe');
    }

    const appointment = {
      ...rest,
      room: { id: roomId },
      client: { id: clientId },
    };
    return this.appointmentRepository.save(appointment);
  }

  findAll() {
    const appointments = this.appointmentRepository.find({ relations: ['client', 'room'] });
    console.log('Appointments found:', appointments);
    return appointments;
  }

  findOne(id: number) {
    const appointment = this.appointmentRepository.findOne({ where: { id }, relations: ['client', 'room'] });
    console.log('Appointment found:', appointment);
    return appointment;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, updateAppointmentDto);
  }

  remove(id: number) {
    return this.appointmentRepository.delete(id);
  }

  async updateAttendance(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new BadRequestException('La cita no existe');
    }
    if (!Object.values(NoAttendanceStatus).includes(updateAttendanceDto.attendanceStatus)) {
      throw new BadRequestException('Estado de asistencia inválido');
    }
    appointment.attendanceStatus = updateAttendanceDto.attendanceStatus;
    return this.appointmentRepository.save(appointment);
  }

  async updateComments(id: number, updateCommentsDto: UpdateCommentsDto) {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new BadRequestException('La cita no existe');
    }
    
    appointment.comments = updateCommentsDto.comments;
    return this.appointmentRepository.save(appointment);
  }
}
