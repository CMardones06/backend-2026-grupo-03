import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PlantasService } from '../services/plantas.service';
import { CrearPlantaDto } from '../dto/crear-planta.dto';

@Controller('plantas')
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  @Post()
  async crear(@Body() crearPlantaDto: CrearPlantaDto) {
    return await this.plantasService.crear(crearPlantaDto);
  }

  @Get()
  async obtenerTodas(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.plantasService.obtenerTodas(page, limit);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number) {
    return await this.plantasService.obtenerPorId(Number(id));
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: number,
    @Body() actualizarDto: Partial<CrearPlantaDto>,
  ) {
    return await this.plantasService.actualizar(Number(id), actualizarDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    return await this.plantasService.eliminar(Number(id));
  }
}