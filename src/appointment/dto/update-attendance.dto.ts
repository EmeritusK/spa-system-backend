import { ApiProperty } from '@nestjs/swagger';
import { NoAttendanceStatus } from '../enums/attendance_status.enum';

export class UpdateAttendanceDto {
  @ApiProperty({
    example: NoAttendanceStatus.CONFIRMED,
    enum: NoAttendanceStatus,
    description: 'Estado de asistencia: pending, confirmed, no_attendance',
  })
  attendanceStatus: NoAttendanceStatus;
}
