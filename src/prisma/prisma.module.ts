// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Hacemos el módulo global
@Module({
    providers: [PrismaService],
    exports: [PrismaService], // Exportamos el servicio
})
export class PrismaModule { }