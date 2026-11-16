import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RiegosService } from '../services/riegos.service';
import {
  CrearRiegoDto,
  ActualizarRiegoDto,
  RiegoRespuestaDto,
  RiegosPaginadosRespuestaDto,
} from '../dto/crear-riego.dto';
import { PaginacionDto } from '../dto/paginacion.dto';
import { RespuestaError } from '../http-error.filter';

@ApiTags('Riegos')
@Controller('riegos')
export class RiegosController {
  constructor(private readonly riegosService: RiegosService) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar un riego',
    description:
      'Guarda un riego para una planta existente que no esté muerta. La fecha no puede ser futura.',
  })
  @ApiBody({ type: CrearRiegoDto })
  @ApiCreatedResponse({
    description: 'Riego registrado con su planta asociada.',
    type: RiegoRespuestaDto,
  })
  @RespuestaError(
    400,
    'La fecha es futura o la planta está muerta.',
    'INVALID_RIEGO_DATE',
    'La fecha de riego no puede ser posterior a la fecha y hora actual',
  )
  @RespuestaError(
    404,
    'La planta no existe.',
    'PLANTA_NO_ENCONTRADA',
    'No se puede registrar el riego porque la planta con id 999999 no existe',
  )
  @RespuestaError(
    422,
    'Los datos enviados no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['La cantidad en ml debe ser mayor a 0'],
  )
  async crear(@Body() crearRiegoDto: CrearRiegoDto) {
    return await this.riegosService.crear(crearRiegoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar registros de riego',
    description:
      'Devuelve una página de registros con su planta asociada. Por defecto utiliza page=1 y limit=10.',
  })
  @ApiOkResponse({
    description: 'Registros de riego y metadatos de paginación.',
    type: RiegosPaginadosRespuestaDto,
  })
  @RespuestaError(
    422,
    'Los parámetros de paginación no son válidos.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['page must not be less than 1'],
  )
  async obtenerTodos(@Query() consulta: PaginacionDto) {
    return await this.riegosService.obtenerTodos(
      consulta.page,
      consulta.limit,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar un riego por ID',
    description: 'Devuelve un registro de riego con su planta asociada.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero del registro de riego',
  })
  @ApiOkResponse({
    description: 'Registro de riego encontrado.',
    type: RiegoRespuestaDto,
  })
  @RespuestaError(
    400,
    'El ID no es un número entero.',
    'Bad Request',
    'Validation failed (numeric string is expected)',
  )
  @RespuestaError(
    404,
    'El registro de riego no existe.',
    'REGISTRO_RIEGO_NO_ENCONTRADO',
    'No existe un registro de riego con id 999999',
  )
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.riegosService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un riego',
    description:
      'Actualiza los campos enviados y conserva los omitidos. Si se cambia la planta, debe existir y no estar muerta. La fecha no puede ser futura.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero del registro de riego',
  })
  @ApiBody({ type: ActualizarRiegoDto })
  @ApiOkResponse({
    description: 'Registro de riego actualizado.',
    type: RiegoRespuestaDto,
  })
  @RespuestaError(
    400,
    'El ID no es un entero, la fecha es futura o la nueva planta está muerta. Los códigos posibles son Bad Request, INVALID_RIEGO_DATE y CANNOT_WATER_DEAD_PLANT.',
    'INVALID_RIEGO_DATE',
    'La fecha de riego no puede ser posterior a la fecha y hora actual',
  )
  @RespuestaError(
    404,
    'El registro o la planta indicada no existe. Los códigos posibles son REGISTRO_RIEGO_NO_ENCONTRADO y PLANTA_NO_ENCONTRADA.',
    'PLANTA_NO_ENCONTRADA',
    'La planta con id 999999 no existe',
  )
  @RespuestaError(
    422,
    'Los datos enviados no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['La cantidad en ml debe ser mayor a 0'],
  )
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarDto: ActualizarRiegoDto,
  ) {
    return await this.riegosService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un registro de riego',
    description:
      'Elimina el registro y devuelve un mensaje de confirmación. La planta asociada se conserva.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero del registro de riego',
  })
  @ApiOkResponse({
    description: 'Registro de riego eliminado.',
    schema: {
      type: 'object',
      required: ['message'],
      properties: {
        message: {
          type: 'string',
          example: 'El registro de riego con id 1 ha sido eliminado exitosamente',
        },
      },
    },
  })
  @RespuestaError(
    400,
    'El ID no es un número entero.',
    'Bad Request',
    'Validation failed (numeric string is expected)',
  )
  @RespuestaError(
    404,
    'El registro de riego no existe.',
    'REGISTRO_RIEGO_NO_ENCONTRADO',
    'No existe un registro de riego con id 999999',
  )
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.riegosService.eliminar(id);
  }
}