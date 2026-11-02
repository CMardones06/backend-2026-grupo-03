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
      
      const getDefaultCode = (statusCode: number) => {
        switch (statusCode) {
          case HttpStatus.NOT_FOUND:
            return 'RESOURCE_NOT_FOUND';
          case HttpStatus.CONFLICT:
            return 'CONFLICT_ERROR';
          case HttpStatus.UNPROCESSABLE_ENTITY:
            return 'UNPROCESSABLE_ENTITY';
          default:
            return 'BAD_REQUEST';
        }
      };

      if (Array.isArray(res.message)) {
        code = 'VALIDATION_ERROR';
        message = 'Error en la validación de los datos enviados';
        details = res.message;
      } else if (typeof res === 'object' && res !== null) {
        code = res.code || res.error || getDefaultCode(status);
        message = res.message || exception.message;
        details = res.details || [];
      } else {
        code = getDefaultCode(status);
        message = typeof res === 'string' ? res : exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
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