import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para producción
  app.enableCors({
    origin: process.env.NODE_ENV === 'production'
      ? true // Permite todos los orígenes en producción (ajusta según sea necesario)
      : true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no permitidas
    forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no permitidas
  }));

  const config = new DocumentBuilder()
    .setTitle('Tienda API')
    .setDescription('API para gestión de tienda')
    .setVersion('1.0')
    .addTag('tienda')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
