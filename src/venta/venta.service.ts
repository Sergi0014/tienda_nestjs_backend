import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VentasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createVentaDto: CreateVentaDto) {
    const { clienteId, productoId, cantidad } = createVentaDto;

    const producto = await this.prisma.producto.findUnique({ where: { id: Number(productoId) } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID "${productoId}" no encontrado`);
    }

    const cliente = await this.prisma.cliente.findUnique({ where: { id: Number(clienteId) } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID "${clienteId}" no encontrado`);
    }

    const total = producto.precio * cantidad;

    return this.prisma.venta.create({
      data: {
        clienteId: Number(clienteId),
        productoId: Number(productoId),
        cantidad,
        total,
      },
      include: {
        cliente: true,
        producto: true,
      },
    });
  }

  findAll() {
    return this.prisma.venta.findMany({
      include: {
        cliente: true,
        producto: true,
      },
    });
  }

  async findOne(id: string) {
    const venta = await this.prisma.venta.findUnique({
      where: { id: Number(id) },
      include: {
        cliente: true,
        producto: true,
      },
    });

    if (!venta) {
      throw new NotFoundException(`Venta con ID "${id}" no encontrada.`);
    }
    return venta;
  }

  async update(id: string, updateVentaDto: UpdateVentaDto) {
    // Primero, nos aseguramos de que la venta exista.
    // El método findOne ya incluye la información del producto, así que la reutilizamos.
    const ventaExistente = await this.findOne(id);

    // Recalculamos el total con la nueva cantidad y el precio del producto existente
    const nuevoTotal = ventaExistente.producto.precio * updateVentaDto.cantidad;

    // Actualizamos la venta con la nueva cantidad y el nuevo total
    return this.prisma.venta.update({
      where: { id: Number(id) },
      data: {
        cantidad: updateVentaDto.cantidad,
        total: nuevoTotal,
      },
      include: {
        cliente: true,
        producto: true,
      },
    });
  }

  async remove(id: string) {
    // Verificamos que la venta exista antes de intentar borrarla.
    await this.findOne(id);

    await this.prisma.venta.delete({ where: { id: Number(id) } });

    return { message: `Venta con ID "${id}" eliminada.` };
  }
}