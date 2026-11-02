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
import { PlantasService } from '../services/plantas.service';
import {
  CrearPlantaDto,
  ActualizarPlantaDto,
  PlantaRespuestaDto,
  PlantasPaginadasRespuestaDto,
} from '../dto/crear-planta.dto';
import { PaginacionDto } from '../dto/paginacion.dto';
import { RespuestaError } from '../http-error.filter';

@ApiTags('Plantas')
@Controller('plantas')
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una planta',
    description:
      'Guarda una planta asociada a una especie y un usuario existentes. Si se omite estado_salud, utiliza Saludable.',
  })
  @ApiBody({ type: CrearPlantaDto })
  @ApiCreatedResponse({
    description: 'Planta creada con su especie y usuario asociados.',
    type: PlantaRespuestaDto,
  })
  @RespuestaError(
    404,
    'La especie o el usuario indicado no existe.',
    'ESPECIE_NO_ENCONTRADA',
    'La especie con ID 999999 no existe',
  )
  @RespuestaError(
    422,
    'Los datos enviados no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['especie_id must not be less than 1'],
  )
  async crear(@Body() crearPlantaDto: CrearPlantaDto) {
    return await this.plantasService.crear(crearPlantaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar plantas',
    description:
      'Devuelve una página de plantas con su especie, usuario y registros de riego. Por defecto utiliza page=1 y limit=10.',
  })
  @ApiOkResponse({
    description: 'Plantas y metadatos de paginación.',
    type: PlantasPaginadasRespuestaDto,
  })
  @RespuestaError(
    422,
    'Los parámetros de paginación no son válidos.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['page must not be less than 1'],
  )
  async obtenerTodas(@Query() consulta: PaginacionDto) {
    return await this.plantasService.obtenerTodas(
      consulta.page,
      consulta.limit,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar una planta por ID',
    description:
      'Devuelve una planta con su especie, usuario y registros de riego.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero de la planta',
  })
  @ApiOkResponse({
    description: 'Planta encontrada.',
    type: PlantaRespuestaDto,
  })
  @RespuestaError(
    400,
    'El ID no es un número entero.',
    'Bad Request',
    'Validation failed (numeric string is expected)',
  )
  @RespuestaError(
    404,
    'La planta no existe.',
    'PLANTA_NO_ENCONTRADA',
    'La planta con ID 999999 no existe',
  )
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.plantasService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una planta',
    description:
      'Actualiza los campos enviados y conserva los omitidos. Si se cambia la especie o el usuario, comprueba que existan.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero de la planta',
  })
  @ApiBody({ type: ActualizarPlantaDto })
  @ApiOkResponse({
    description: 'Planta actualizada.',
    type: PlantaRespuestaDto,
  })
  @RespuestaError(
    400,
    'El ID no es un número entero.',
    'Bad Request',
    'Validation failed (numeric string is expected)',
  )
  @RespuestaError(
    404,
    'La planta, la especie o el usuario indicado no existe.',
    'USUARIO_NO_ENCONTRADO',
    'El usuario con ID 999999 no existe',
  )
  @RespuestaError(
    422,
    'Los datos enviados no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['El estado debe ser Excelente, Saludable, Enferma, Crítica o Muerta'],
  )
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarDto: ActualizarPlantaDto,
  ) {
    return await this.plantasService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una planta',
    description:
      'Elimina la planta y sus registros de riego asociados por la relación en cascada de la base.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero de la planta',
  })
  @ApiOkResponse({
    description: 'Planta eliminada.',
    schema: {
      type: 'object',
      required: ['message'],
      properties: {
        message: {
          type: 'string',
          example: 'La planta con id 1 ha sido eliminada exitosamente',
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
    'La planta no existe.',
    'PLANTA_NO_ENCONTRADA',
    'La planta con ID 999999 no existe',
  )
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.plantasService.eliminar(id);
  }
}