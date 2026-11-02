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
import { RiegosService } from '../services/riegos.service';
import {
  CrearRiegoDto,
  ActualizarRiegoDto,
} from '../dto/crear-riego.dto';
import { PaginacionDto } from '../dto/paginacion.dto';

@Controller('riegos')
export class RiegosController {
  constructor(private readonly riegosService: RiegosService) {}

  @Post()
  async crear(@Body() crearRiegoDto: CrearRiegoDto) {
    return await this.riegosService.crear(crearRiegoDto);
  }

  @Get()
  async obtenerTodos(@Query() consulta: PaginacionDto) {
    return await this.riegosService.obtenerTodos(
      consulta.page,
      consulta.limit,
    );
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.riegosService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarDto: ActualizarRiegoDto,
  ) {
    return await this.riegosService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.riegosService.eliminar(id);
  }
}