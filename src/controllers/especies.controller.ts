import {
  Controller, Get, Post, Body, Param,
  Put, Delete, Query, ParseIntPipe,
} from '@nestjs/common';
import { EspeciesService } from '../services/especies.service';
import {
  CrearEspecieDto,
  ActualizarEspecieDto,
} from '../dto/crear-especie.dto';
import { PaginacionDto } from '../dto/paginacion.dto';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  async crear(@Body() crearEspecieDto: CrearEspecieDto) {
    return await this.especiesService.crear(crearEspecieDto);
  }

  @Get()
  async obtenerTodas(@Query() consulta: PaginacionDto) {
    return await this.especiesService.obtenerTodas(
      consulta.page,
      consulta.limit,
    );
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.especiesService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarDto: ActualizarEspecieDto,
  ) {
    return await this.especiesService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.especiesService.eliminar(id);
  }
}