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
import { EspeciesService } from '../services/especies.service';
import {
  CrearEspecieDto,
  ActualizarEspecieDto,
  EspecieRespuestaDto,
  EspecieDetalleRespuestaDto,
  EspeciesPaginadasRespuestaDto,
} from '../dto/crear-especie.dto';
import { PaginacionDto } from '../dto/paginacion.dto';
import { RespuestaError } from '../http-error.filter';

@ApiTags('Especies')
@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una especie',
    description:
      'Guarda una especie con nombre común, nombre científico y origen. La descripción es opcional.',
  })
  @ApiBody({ type: CrearEspecieDto })
  @ApiCreatedResponse({
    description: 'Especie creada.',
    type: EspecieRespuestaDto,
  })
  @RespuestaError(
    422,
    'Los datos enviados no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['nombre_comun must be longer than or equal to 3 characters'],
  )
  async crear(@Body() crearEspecieDto: CrearEspecieDto) {
    return await this.especiesService.crear(crearEspecieDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar especies',
    description:
      'Devuelve una página de especies con sus plantas asociadas. Por defecto utiliza page=1 y limit=10.',
  })
  @ApiOkResponse({
    description: 'Especies y metadatos de paginación.',
    type: EspeciesPaginadasRespuestaDto,
  })
  @RespuestaError(
    422,
    'Los parámetros de paginación no son válidos.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['page must not be less than 1'],
  )
  async obtenerTodas(@Query() consulta: PaginacionDto) {
    return await this.especiesService.obtenerTodas(
      consulta.page,
      consulta.limit,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar una especie por ID',
    description: 'Devuelve una especie con sus plantas asociadas.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero de la especie',
  })
  @ApiOkResponse({
    description: 'Especie encontrada.',
    type: EspecieDetalleRespuestaDto,
  })
  @RespuestaError(
    400,
    'El ID no es un número entero.',
    'Bad Request',
    'Validation failed (numeric string is expected)',
  )
  @RespuestaError(
    404,
    'La especie no existe.',
    'ESPECIE_NO_ENCONTRADA',
    'No existe una especie con id 999999',
  )
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.especiesService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una especie',
    description:
      'Actualiza los campos enviados y conserva los que se omiten.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero de la especie',
  })
  @ApiBody({ type: ActualizarEspecieDto })
  @ApiOkResponse({
    description: 'Especie actualizada.',
    type: EspecieDetalleRespuestaDto,
  })
  @RespuestaError(
    400,
    'El ID no es un número entero.',
    'Bad Request',
    'Validation failed (numeric string is expected)',
  )
  @RespuestaError(
    404,
    'La especie no existe.',
    'ESPECIE_NO_ENCONTRADA',
    'No existe una especie con id 999999',
  )
  @RespuestaError(
    422,
    'Los datos enviados no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['nombre_comun must be longer than or equal to 3 characters'],
  )
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarDto: ActualizarEspecieDto,
  ) {
    return await this.especiesService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una especie',
    description:
      'Elimina la especie. Por las relaciones de la base, también elimina sus plantas y los riegos de esas plantas.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero de la especie',
  })
  @ApiOkResponse({
    description: 'Especie eliminada.',
    schema: {
      type: 'object',
      required: ['message'],
      properties: {
        message: {
          type: 'string',
          example: 'La especie con id 1 ha sido eliminada exitosamente',
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
    'La especie no existe.',
    'ESPECIE_NO_ENCONTRADA',
    'No existe una especie con id 999999',
  )
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.especiesService.eliminar(id);
  }
}