import { Module } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
