import { Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { RiegosService } from '../services/riegos.service';

@Controller('riegos')
export class RiegosController {
  constructor(private readonly riegosService: RiegosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  crear(@Body() datos: any) {
    return this.riegosService.crearRiego(datos);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  obtenerTodos(
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
      },
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  obtenerPorId(@Param('id') id: string) {
    return { id: Number(id), cantidad_ml: 500 };
  }
}