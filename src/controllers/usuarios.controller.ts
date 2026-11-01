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
import { UsuariosService } from '../services/usuarios.service';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { ConsultarUsuariosDto } from '../dto/consultar-usuarios.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  crear(@Body() datos: CrearUsuarioDto) {
    return this.usuariosService.crear(datos);
  }

    @Get()
    obtenerTodos(@Query() consulta: ConsultarUsuariosDto) {
    return this.usuariosService.obtenerTodos(consulta);
    }

  @Get(':id')
  obtenerPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuariosService.obtenerPorId(id);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: CrearUsuarioDto,
  ) {
    return this.usuariosService.actualizar(id, datos);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.usuariosService.eliminar(id);
  }
}