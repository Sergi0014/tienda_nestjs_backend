import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('health')
@Controller()
export class HealthController {
    constructor(private readonly prisma: PrismaService) { }

    @Get()
    @ApiOperation({ summary: 'Health check endpoint' })
    @ApiResponse({ status: 200, description: 'API is healthy' })
    @ApiResponse({ status: 503, description: 'API is unhealthy' })
    async healthCheck() {
        try {
            // Verificar conexión a la base de datos
            await this.prisma.$queryRaw`SELECT 1`;

            return {
                status: 'ok',
                timestamp: new Date().toISOString(),
                service: 'backend-nest-tienda',
                database: 'connected',
                uptime: process.uptime(),
            };
        } catch (error) {
            return {
                status: 'error',
                timestamp: new Date().toISOString(),
                service: 'backend-nest-tienda',
                database: 'disconnected',
                error: error.message,
                uptime: process.uptime(),
            };
        }
    }

    @Get('health')
    @ApiOperation({ summary: 'Detailed health check' })
    @ApiResponse({ status: 200, description: 'Detailed health information' })
    async detailedHealthCheck() {
        try {
            const dbTime = await this.prisma.$queryRaw`SELECT NOW() as time` as any[];

            return {
                status: 'healthy',
                timestamp: new Date().toISOString(),
                service: 'backend-nest-tienda',
                version: process.env.npm_package_version || '1.0.0',
                environment: process.env.NODE_ENV || 'development',
                database: {
                    status: 'connected',
                    serverTime: dbTime[0]?.time,
                },
                memory: process.memoryUsage(),
                uptime: process.uptime(),
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                service: 'backend-nest-tienda',
                error: error.message,
                uptime: process.uptime(),
            };
        }
    }
}
