import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.crear(crearUsuarioDto);
  }

  @Get()
  async obtenerTodos(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.usuariosService.obtenerTodos(page, limit);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number) {
    return await this.usuariosService.obtenerPorId(Number(id));
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: number,
    @Body() actualizarDto: Partial<CrearUsuarioDto>,
  ) {
    return await this.usuariosService.actualizar(Number(id), actualizarDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    return await this.usuariosService.eliminar(Number(id));
  }
}