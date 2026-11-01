import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './http-error.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita las validaciones globales usando los DTOs
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Alertas y Cronograma de Riego')
    .setDescription('Documentación de la api')
    .setVersion('2.0')
    .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpErrorFilter());
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);

  console.log('servidor corriendo en: http://localhost:3000');
  console.log('servidor Swagger en: http://localhost:3000/api');
}
bootstrap();