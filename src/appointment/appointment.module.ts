import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Client } from 'src/client/entities/client.entity';
import { Room } from 'src/room/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Client, Room])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
