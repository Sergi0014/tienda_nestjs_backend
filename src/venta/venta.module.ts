import { Module } from '@nestjs/common';
import { VentasService } from './venta.service';
import { VentaController } from './venta.controller';

@Module({
  controllers: [VentaController],
  providers: [VentasService],
})
export class VentaModule { }
