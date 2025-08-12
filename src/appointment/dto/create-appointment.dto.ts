// src/cita/dto/create-cita.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Fecha y hora de la cita',
    example: '2024-01-15T10:00:00Z'
  })
  dateTime: Date;

  @ApiProperty({
    description: 'ID del cliente',
    example: 1
  })
  clientId: number;

  @ApiProperty({
    description: 'ID de la sala',
    example: 1
  })
  roomId: number;

  @ApiProperty({
    description: 'Comentarios de la cita',
    example: 'El cliente solicitó un masaje relajante',
    required: false,
    maxLength: 1000
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  comments?: string;
}
