import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { VentasService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentasService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un venta' })
  @ApiResponse({ status: 201, description: 'Venta creada correctamente.', type: CreateVentaDto })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiBody({
    type: CreateVentaDto,
    description: 'Datos de la venta a crear',
    examples: {
      ejemplo1: {
        summary: 'Venta básica',
        description: 'Ejemplo básico de creación de una venta',
        value: {
          clienteId: 1,
          productoId: 1,
          cantidad: 2
        }
      }
    }
  })
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.create(createVentaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas los ventas' })
  @ApiResponse({ status: 200, description: 'Se obtuvieron las ventas correctamente.' })
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un venta por ID' })
  @ApiResponse({ status: 200, description: 'Se obtuvo la venta correctamente.' })
  @ApiResponse({ status: 404, description: 'La venta no fue encontrado.' })
  findOne(@Param('id') id: string) {
    return this.ventaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'La venta no fue encontrado.' })
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventaService.update(id, updateVentaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'La venta no fue encontrado.' })
  remove(@Param('id') id: string) {
    return this.ventaService.remove(id);
  }
}
