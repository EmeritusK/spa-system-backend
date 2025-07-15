import { Module } from '@nestjs/common';
import { IdNumberValidatorService } from './client/id-number-validator.service';

@Module({
  providers: [IdNumberValidatorService],
  exports: [IdNumberValidatorService],
})
export class ValidationsModule {}
