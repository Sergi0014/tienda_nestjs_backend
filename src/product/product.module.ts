import { Module } from '@nestjs/common';
import { ProductosService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductosService]
})
export class ProductosModule { } 