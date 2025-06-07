import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentRepository.save(createAppointmentDto);
  }

  findAll() {
    return this.appointmentRepository.find();
  }

  findOne(id: number) {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, updateAppointmentDto);
  }

  remove(id: number) {
    return this.appointmentRepository.delete(id);
  }
}
