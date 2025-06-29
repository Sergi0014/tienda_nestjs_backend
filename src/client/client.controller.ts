import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClienteDto } from './dto/create-client.dto';
import { UpdateClienteDto } from './dto/update-client.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado correctamente.', type: CreateClienteDto })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiBody({
    type: CreateClienteDto,
    description: 'Datos del cliente a crear',
    examples: {
      ejemplo1: {
        summary: 'Cliente básico',
        description: 'Ejemplo básico de creación de cliente',
        value: {
          nombre: 'Juan Pérez',
          email: 'juan.perez@example.com'
        }
      }

    }
  })
  create(@Body() createClientDto: CreateClienteDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Se obtuvieron los clientes correctamente.' })
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Se obtuvo el cliente correctamente.' })
  @ApiResponse({ status: 404, description: 'El cliente no fue encontrado.' })
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'El cliente no fue encontrado.' })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'El cliente no fue encontrado.' })
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}




