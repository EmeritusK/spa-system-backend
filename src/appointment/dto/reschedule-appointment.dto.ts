import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class RescheduleAppointmentDto {
  @ApiProperty({
    description: 'Nueva fecha y hora de la cita (puede ser en el pasado o futuro)',
    example: '2024-01-15T14:00:00Z',
    type: String
  })
  @IsDateString()
  @IsNotEmpty()
  dateTime: string;
}
