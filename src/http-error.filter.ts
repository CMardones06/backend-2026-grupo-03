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
    let details: any[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      
        code = 'VALIDATION_ERROR';
        message = 'Error en la validación de los datos enviados';
        details = res.message;
      } 
      
      else if (typeof res === 'object' && res !== null) {
        code = res.code || res.error || (status === 404 ? 'RESOURCE_NOT_FOUND' : 'BAD_REQUEST');
        message = res.message || exception.message;
        details = res.details || [];
      } else {
        code = status === 404 ? 'RESOURCE_NOT_FOUND' : 'BAD_REQUEST';
        message = typeof res === 'string' ? res : exception.message;
      }
    }

    response.status(status).json({
      error: {
        code,
        message,
        details,
      },
    });
  }
}