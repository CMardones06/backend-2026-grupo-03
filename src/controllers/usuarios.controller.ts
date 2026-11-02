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
import { UsuariosService } from '../services/usuarios.service';
import {
  CrearUsuarioDto,
  ActualizarUsuarioDto,
} from '../dto/crear-usuario.dto';
import { ConsultarUsuariosDto } from '../dto/consultar-usuarios.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.crear(crearUsuarioDto);
  }

  @Get()
  async obtenerTodos(@Query() consulta: ConsultarUsuariosDto) {
    return await this.usuariosService.obtenerTodos(consulta);
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.usuariosService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarDto: ActualizarUsuarioDto,
  ) {
    return await this.usuariosService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.usuariosService.eliminar(id);
  }
}