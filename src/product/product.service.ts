import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service'; // Importamos PrismaService

@Injectable()
export class ProductosService {
  // Inyectamos PrismaService en lugar del repositorio de TypeORM
  constructor(private readonly prisma: PrismaService) { }

  // Usamos prisma.producto.create para crear un nuevo producto 
  async create(createProductoDto: CreateProductDto) {
    const nombreExistente = await this.prisma.producto.findUnique({
      where: { nombre: createProductoDto.nombre },
    });
    if (nombreExistente) {
      throw new Error(`El nombre del producto ${createProductoDto.nombre} ya está en uso.`);
    }
    // Creamos el producto usando Prisma
    // Aquí asumimos que el DTO tiene un campo 'nombre' y otros campos necesarios


    return this.prisma.producto.create({ data: createProductoDto });
  }

  // Usamos prisma.producto.findMany para obtener todos los productos 
  findAll() {
    return this.prisma.producto.findMany();
  }

  // Usamos prisma.producto.findUnique para buscar por un campo único como el ID 
  async findOne(id: string) {
    const producto = await this.prisma.producto.findUnique({ where: { id: Number(id) } });

    // La lógica para manejar un producto 
    if (!producto) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado.`);
    }
    return producto;
  }

  //  prisma.producto.update para actualizar 
  async update(id: string, updateProductoDto: UpdateProductDto) {
    // Primero nos aseguramos de que el producto exista
    await this.findOne(id);

    return this.prisma.producto.update({
      where: { id: Number(id) },
      data: updateProductoDto,
    });
  }

  // Usamos prisma.producto.delete para eliminar 
  async remove(id: string) {
    // Reutilizamos findOne para verificar la existencia y obtener el producto 
    await this.findOne(id);

    await this.prisma.producto.delete({ where: { id: Number(id) } });

    return { message: `Producto con ID "${id}" eliminado.` }
  }
}

