// src/app.module.ts
import { Module } from '@nestjs/common';
import { ProductosModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { VentaModule } from './venta/venta.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    PrismaModule, // Importamos el módulo de Prisma
    HealthModule, // Módulo de health check
    ProductosModule,
    ClientModule,
    VentaModule,
  ],
})
export class AppModule { }