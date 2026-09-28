import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { EspeciesService } from '../services/especies.service';
import { CrearEspecieDto } from '../dto/crear-especie.dto';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  crear(@Body() datos: CrearEspecieDto) {
    return this.especiesService.crear(datos);
  }

  @Get()
  obtenerTodas() {
    return this.especiesService.obtenerTodas();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.especiesService.obtenerPorId(Number(id));
  }
}