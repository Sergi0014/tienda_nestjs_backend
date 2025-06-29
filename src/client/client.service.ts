import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-client.dto';
import { UpdateClienteDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createClientDto: CreateClienteDto) {
    const correoExistente = await this.prisma.cliente.findUnique({
      where: { email: createClientDto.email },
    });
    if (correoExistente) {
      throw new Error(`El correo electrónico ${createClientDto.email} ya está en uso.`);
    }
    return this.prisma.cliente.create({
      data: createClientDto,
    });
  }

  findAll() {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: string) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id: Number(id) } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID "${id}" no encontrado.`);
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    await this.findOne(id); // Asegura que el cliente exista
    return this.prisma.cliente.update({
      where: { id: Number(id) },
      data: updateClienteDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.cliente.delete({ where: { id: Number(id) } });
    return { message: `Cliente con ID "${id}" eliminado.` };
  }
}