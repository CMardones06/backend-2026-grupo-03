import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const res = exception instanceof HttpException ? exception.getResponse() : null;

    // Lee res.code para no perder los códigos de negocio (FECHA_INVALIDA, ESPECIE_NO_ENCONTRADA, etc.)
    const code = (res && typeof res === 'object' && res.code) || (res && typeof res === 'object' && res.error) || 'HTTP_ERROR';
    const message = (res && typeof res === 'object' && res.message) || exception.message || 'Error interno del servidor';

    response.status(status).json({
      statusCode: status,
      code,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}