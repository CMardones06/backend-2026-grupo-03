import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('especies')
export class EspeciesController {

  @Post()
  @HttpCode(HttpStatus.CREATED)
  crear(@Body() datos: any) {
    return { id: 1, ...datos };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  obtenerTodas() {
    return [];
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  obtenerPorId(@Param('id') id: string) {
    return { id: Number(id), nombre_comun: 'Monstera' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  actualizar(@Param('id') id: string, @Body() datos: any) {
    return { id: Number(id), ...datos };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  eliminar(@Param('id') id: string) {
    return;
  }
}