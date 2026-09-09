import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_ERROR';
    let message = 'Ocurrió un error interno';
    let details = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      
      //Manejo de errores de validación de los DTOs
      if (Array.isArray(res.message)) {
        code = 'VALIDATION_ERROR';
        message = 'Error en la validación de los datos enviados';
        details = res.message;
      } else {
        code = res.error || 'HTTP_ERROR';
        message = res.message || exception.message;
      }
    }

    //Estructura JSON
    response.status(status).json({
      error: {
        code,
        message,
        details,
      },
    });
  }
}