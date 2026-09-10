import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PlantasService } from '../services/plantas.service';
import { CrearPlantaDto } from '../dto/crear-planta.dto';

@Controller('plantas')
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  crear(@Body() datos: CrearPlantaDto) {
    return this.plantasService.crearPlanta(datos);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  obtenerTodas(
    @Query('estado_salud') estadoSalud?: string,
    @Query('ordenar_por') ordenarPor: string = 'id',
    @Query('direccion') direccion: string = 'asc',
    @Query('pagina') pagina: string = '1',
    @Query('limite') limite: string = '10',
  ) {
    return {
      data: [],
      meta: {
        total: 0,
        pagina: Number(pagina),
        limite: Number(limite),
        total_paginas: 0,
        filtros: { estado_salud: estadoSalud || null },
        orden: { campo: ordenarPor, direccion },
      },
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  obtenerPorId(@Param('id') id: string) {
    return { id: Number(id), apodo: 'Margarita', estado_salud: 'Optimo' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  actualizar(@Param('id') id: string, @Body() datos: CrearPlantaDto) {
    return { id: Number(id), ...datos };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  eliminar(@Param('id') id: string) {
    return;
  }
}