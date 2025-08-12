import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  create(createRoomDto: CreateRoomDto) {
    return this.roomRepository.save(createRoomDto);
  }

  findAll() {
    return this.roomRepository.find();
  }

  findOne(id: number) {
    return this.roomRepository.findOne({ where: { id } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: number) {
    return this.roomRepository.delete(id);
  }
}
