import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateCommentsDto {
  @ApiProperty({
    description: 'Comentarios de la cita',
    example: 'El cliente solicitó un masaje relajante',
    required: false,
    maxLength: 1000
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  comments: string;
}
