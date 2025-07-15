import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ValidationsModule } from 'src/validations/validations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), ValidationsModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
