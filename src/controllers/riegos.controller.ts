import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { RiegosService } from '../services/riegos.service';
import { CrearRiegoDto } from '../dto/crear-riego.dto';

@Controller('riegos')
export class RiegosController {
  constructor(private readonly riegosService: RiegosService) {}

  @Post()
  async crear(@Body() crearRiegoDto: CrearRiegoDto) {
    return await this.riegosService.crear(crearRiegoDto);
  }

  @Get()
  async obtenerTodos(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.riegosService.obtenerTodos(page, limit);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number) {
    return await this.riegosService.obtenerPorId(Number(id));
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: number,
    @Body() actualizarDto: Partial<CrearRiegoDto>,
  ) {
    return await this.riegosService.actualizar(Number(id), actualizarDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    return await this.riegosService.eliminar(Number(id));
  }
}