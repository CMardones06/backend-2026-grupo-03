import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { EspeciesService } from '../services/especies.service';
import { CrearEspecieDto } from '../dto/crear-especie.dto';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  async crear(@Body() crearEspecieDto: CrearEspecieDto) {
    return await this.especiesService.crear(crearEspecieDto);
  }

  @Get()
  async obtenerTodas(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.especiesService.obtenerTodas(page, limit);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number) {
    return await this.especiesService.obtenerPorId(Number(id));
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: number,
    @Body() actualizarDto: Partial<CrearEspecieDto>,
  ) {
    return await this.especiesService.actualizar(Number(id), actualizarDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    return await this.especiesService.eliminar(Number(id));
  }
}