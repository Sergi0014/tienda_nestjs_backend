import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ProductosService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductosService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiResponse({ status: 201, description: 'producto creado correctamente.', type: CreateProductDto })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Datos del producto a crear',
    examples: {
      ejemplo1: {
        summary: 'Producto básico',
        description: 'Ejemplo básico de creación de Producto',
        value: {
          nombre: 'mouse',
          precio: 15
        }
      }

    }
  })



  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Se obtuvieron los productos correctamente.' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Se obtuvo el producto correctamente.' })
  @ApiResponse({ status: 404, description: 'El producto no fue encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'El producto no fue encontrado.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'El producto no fue encontrado.' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productService.remove(id);
  }
}
