import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpErrorFilter } from './http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 // Activar validaciones globales usando los DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina datos basura no definidos en el DTO
    transform: true,// Transforma strings a números o fechas si el DTO lo pide
  }));
// Activar el formateador de errores JSON global
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(3000);
}
bootstrap();
