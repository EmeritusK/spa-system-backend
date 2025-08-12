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

  async findAll() {
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Executing findAll query`);
    const clients = await this.clientRepository.find();
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Found ${clients.length} clients`);
    return clients;
  }

  async findOne(id: number) {
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Executing findOne query for ID: ${id}`);
    const client = await this.clientRepository.findOne({ where: { id } });
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Client found:`, client ? 'YES' : 'NO');
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Updating client ID: ${id}`);
    const result = await this.clientRepository.update(id, updateClientDto);
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Update result:`, result);
    return result;
  }

  async remove(id: number) {
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Attempting to delete client ID: ${id}`);
    
    // Verificar que el cliente existe antes de eliminarlo
    const existingClient = await this.clientRepository.findOne({ where: { id } });
    if (!existingClient) {
      console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Client ID ${id} not found`);
      throw new BadRequestException('Cliente no encontrado');
    }
    
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Client exists, proceeding with deletion`);
    
    // Eliminar el cliente
    const result = await this.clientRepository.delete(id);
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Delete result:`, result);
    
    // Verificar que realmente se eliminó
    if (result.affected === 0) {
      console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] Failed to delete client ID: ${id}`);
      throw new InternalServerErrorException('Error al eliminar el cliente');
    }
    
    // Verificar que ya no existe en la base de datos
    const deletedClient = await this.clientRepository.findOne({ where: { id } });
    if (deletedClient) {
      console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] WARNING: Client ID ${id} still exists after deletion!`);
      throw new InternalServerErrorException('Error: El cliente sigue existiendo después de la eliminación');
    }
    
    console.log(`[${new Date().toISOString()}] [CLIENT-SERVICE] SUCCESS: Client ID ${id} successfully deleted and verified`);
    return { 
      message: 'Cliente eliminado exitosamente',
      deletedId: id,
      timestamp: new Date().toISOString(),
      verification: 'Data deletion confirmed'
    };
  }
}
