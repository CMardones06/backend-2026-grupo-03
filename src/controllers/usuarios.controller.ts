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
import { UsuariosService } from '../services/usuarios.service';
import {
  CrearUsuarioDto,
  ActualizarUsuarioDto,
} from '../dto/crear-usuario.dto';
import { ConsultarUsuariosDto } from '../dto/consultar-usuarios.dto';
import {
  UsuarioRespuestaDto,
  UsuarioDetalleRespuestaDto,
  UsuariosPaginadosRespuestaDto,
} from '../dto/usuario-respuesta.dto';
import { RespuestaError } from '../http-error.filter';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un usuario',
    description:
      'Guarda un usuario. El correo debe ser único. Si se omite activo, se utiliza true.',
  })
  @ApiBody({ type: CrearUsuarioDto })
  @ApiCreatedResponse({
    description: 'Usuario creado.',
    type: UsuarioRespuestaDto,
  })
  @RespuestaError(
    409,
    'El correo ya está registrado.',
    'EMAIL_ALREADY_EXISTS',
    'El correo electrónico ya se encuentra registrado',
  )
  @RespuestaError(
    422,
    'Los datos enviados no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['email must be an email'],
  )
  async crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.crear(crearUsuarioDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar usuarios',
    description:
      'Permite combinar filtro por rol, ordenamiento y paginación. El total corresponde a los usuarios que cumplen el filtro.',
  })
  @ApiOkResponse({
    description: 'Usuarios y metadatos de paginación.',
    type: UsuariosPaginadosRespuestaDto,
  })
  @RespuestaError(
    422,
    'Los parámetros de consulta no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['pagina must not be less than 1'],
  )
  async obtenerTodos(@Query() consulta: ConsultarUsuariosDto) {
    return await this.usuariosService.obtenerTodos(consulta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar un usuario por ID',
    description: 'Devuelve el usuario y sus plantas asociadas.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero del usuario',
  })
  @ApiOkResponse({
    description: 'Usuario encontrado.',
    type: UsuarioDetalleRespuestaDto,
  })
  @RespuestaError(
    400,
    'El ID no es un número entero.',
    'Bad Request',
    'Validation failed (numeric string is expected)',
  )
  @RespuestaError(
    404,
    'El usuario no existe.',
    'USUARIO_NO_ENCONTRADO',
    'No existe un usuario con el id 999999',
  )
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.usuariosService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description:
      'Actualiza los campos enviados y conserva los omitidos. El correo no puede pertenecer a otro usuario.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero del usuario',
  })
  @ApiBody({ type: ActualizarUsuarioDto })
  @ApiOkResponse({
    description: 'Usuario actualizado.',
    type: UsuarioDetalleRespuestaDto,
  })
  @RespuestaError(
    400,
    'El ID no es un número entero.',
    'Bad Request',
    'Validation failed (numeric string is expected)',
  )
  @RespuestaError(
    404,
    'El usuario no existe.',
    'USUARIO_NO_ENCONTRADO',
    'No existe un usuario con el id 999999',
  )
  @RespuestaError(
    409,
    'El correo pertenece a otro usuario.',
    'EMAIL_ALREADY_EXISTS',
    'Ya existe otro usuario con ese correo electrónico',
  )
  @RespuestaError(
    422,
    'Los datos enviados no cumplen las validaciones.',
    'VALIDATION_ERROR',
    'Error en la validación de los datos enviados',
    ['El rol debe ser admin o user'],
  )
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarDto: ActualizarUsuarioDto,
  ) {
    return await this.usuariosService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description:
      'Elimina un usuario existente y devuelve un mensaje de confirmación.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador entero del usuario',
  })
  @ApiOkResponse({
    description: 'Usuario eliminado.',
    schema: {
      type: 'object',
      required: ['message'],
      properties: {
        message: {
          type: 'string',
          example: 'El usuario con id 1 ha sido eliminado con éxito',
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
    'El usuario no existe.',
    'USUARIO_NO_ENCONTRADO',
    'No existe un usuario con el id 999999',
  )
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.usuariosService.eliminar(id);
  }
}