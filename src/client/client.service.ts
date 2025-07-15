import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { IdNumberValidatorService } from 'src/validations/client/id-number-validator.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private idNumberValidatorService: IdNumberValidatorService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      if (!this.idNumberValidatorService.validate(createClientDto.idNumber)) {
        throw new BadRequestException('Número de identificación inválido');
      }
      const client = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(client);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Error al crear el cliente');
    }
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: number) {
    return this.clientRepository.findOne({ where: { id } });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
