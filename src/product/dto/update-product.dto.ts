import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// PartialType hace que todas las propiedades de CreateProductoDto sean opcionales en UpdateProductDto

export class UpdateProductDto extends PartialType(CreateProductDto) { }
// Esto permite que UpdateProductDto herede las propiedades de CreateProductDto,
// pero las convierte en opcionales, lo que es útil para las actualizaciones parciales de productos.