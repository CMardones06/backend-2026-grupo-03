import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsuariosService } from '../services/usuarios.service';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { ConsultarUsuariosDto } from '../dto/consultar-usuarios.dto';
import {
  UsuarioRespuestaDto,
  UsuariosPaginadosRespuestaDto,
} from '../dto/usuario-respuesta.dto';

// Describe el formato de error que devuelve el filtro global.
function documentarError(
  status: number,
  description: string,
  code: string,
  message: string,
  details: string[] = [],
) {
  return {
    status,
    description,
    schema: {
      type: 'object' as const,
      required: ['error'],
      properties: {
        error: {
          type: 'object' as const,
          required: ['code', 'message', 'details'],
          properties: {
            code: { type: 'string' as const },
            message: { type: 'string' as const },
            details: {
              type: 'array' as const,
              items: { type: 'string' as const },
            },
          },
        },
      },
      example: {
        error: { code, message, details },
      },
    },
  };
}

const errorValidacion = documentarError(
  422,
  'El cuerpo o los parámetros no cumplen las validaciones.',
  'VALIDATION_ERROR',
  'Error en la validación de los datos enviados',
  ['Detalle de la validación incumplida'],
);

const errorNoEncontrado = documentarError(
  404,
  'No existe un usuario con el ID solicitado.',
  'Not Found',
  'No existe un usuario con ID 999',
);

const errorIdInvalido = documentarError(
  400,
  'El ID debe ser un número entero.',
  'Bad Request',
  'Validation failed (numeric string is expected)',
);

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un usuario',
    description:
      'Guarda un usuario en SQLite. El correo debe ser único. ' +
      'Si se omite activo, se utiliza true.',
  })
  @ApiBody({ type: CrearUsuarioDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente.',
    type: UsuarioRespuestaDto,
  })
  @ApiResponse(
    documentarError(
      409,
      'El correo ya está registrado.',
      'Conflict',
      'Ya existe un usuario con ese correo electrónico',
    ),
  )
  @ApiResponse(errorValidacion)
  crear(@Body() datos: CrearUsuarioDto) {
    return this.usuariosService.crear(datos);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar usuarios con filtro, orden y paginación',
    description:
      'Consulta usuarios persistidos. Primero filtra por rol, ' +
      'después ordena y finalmente pagina. Los totales corresponden ' +
      'al conjunto filtrado. Una página fuera del rango devuelve ' +
      'items vacío y conserva los totales.',
  })
  @ApiResponse({
    status: 200,
    description: 'Página de usuarios y metadatos de la consulta.',
    type: UsuariosPaginadosRespuestaDto,
  })
  @ApiResponse(errorValidacion)
  obtenerTodos(@Query() consulta: ConsultarUsuariosDto) {
    return this.usuariosService.obtenerTodos(consulta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar un usuario por ID',
    description: 'Consulta un usuario existente en la base de datos.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identificador del usuario',
    example: 8,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado.',
    type: UsuarioRespuestaDto,
  })
  @ApiResponse(errorIdInvalido)
  @ApiResponse(errorNoEncontrado)
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description:
      'Actualiza nombre, email y rol de un usuario existente. ' +
      'Si se omite activo, conserva su valor. El correo no puede ' +
      'pertenecer a otro usuario.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identificador del usuario',
    example: 8,
  })
  @ApiBody({ type: CrearUsuarioDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
    type: UsuarioRespuestaDto,
  })
  @ApiResponse(errorIdInvalido)
  @ApiResponse(errorNoEncontrado)
  @ApiResponse(
    documentarError(
      409,
      'El correo pertenece a otro usuario.',
      'Conflict',
      'Ya existe otro usuario con ese correo electrónico',
    ),
  )
  @ApiResponse(errorValidacion)
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: CrearUsuarioDto,
  ) {
    return this.usuariosService.actualizar(id, datos);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description:
      'Elimina el usuario indicado. Si tiene éxito, responde sin cuerpo.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identificador del usuario',
    example: 8,
  })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado. Sin contenido.',
  })
  @ApiResponse(errorIdInvalido)
  @ApiResponse(errorNoEncontrado)
  async eliminar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.usuariosService.eliminar(id);
  }
}