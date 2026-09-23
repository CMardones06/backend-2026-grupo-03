import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activar el formateador de errores JSON global
  app.useGlobalFilters(new HttpErrorFilter());
  
 // Activar validaciones globales usando los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true, // Elimina datos basura no definidos en el DTO
    forbidNonWhitelisted: true,  
    transform: true,// Transforma strings a números o fechas si el DTO lo pide
  })
);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();