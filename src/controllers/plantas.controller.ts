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
import { PlantasService } from '../services/plantas.service';
import {
  CrearPlantaDto,
  ActualizarPlantaDto,
} from '../dto/crear-planta.dto';
import { PaginacionDto } from '../dto/paginacion.dto';

@Controller('plantas')
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  @Post()
  async crear(@Body() crearPlantaDto: CrearPlantaDto) {
    return await this.plantasService.crear(crearPlantaDto);
  }

  @Get()
  async obtenerTodas(@Query() consulta: PaginacionDto) {
    return await this.plantasService.obtenerTodas(
      consulta.page,
      consulta.limit,
    );
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.plantasService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarDto: ActualizarPlantaDto,
  ) {
    return await this.plantasService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.plantasService.eliminar(id);
  }
}