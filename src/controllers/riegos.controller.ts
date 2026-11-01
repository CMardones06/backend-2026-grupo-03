import { Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { RiegosService } from '../services/riegos.service';
import { CrearRiegoDto } from '../dto/crear-riego.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
@ApiTags('Riegos')
@Controller('riegos')
export class RiegosController {
  constructor(private readonly riegosService: RiegosService) {}

  @Post()
  @ApiOperation({summary:'Registrar un nuevo riego'})
  @ApiResponse({ status: 201, description: 'Riego registrado con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
  @HttpCode(HttpStatus.CREATED)
  crear(@Body() datos: CrearRiegoDto) {
    return this.riegosService.crearRiego(datos);
  }

  @Get()
  @ApiOperation({summary:'Obtener el listado de todos los riegos'})
  @ApiResponse({ status: 200, description: 'Lista de riego obtenida con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
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
  @ApiOperation({ summary: 'Obtener riego por ID' })
  @ApiParam({ name: 'id', description: 'ID único del riego', example: '1' })
  @ApiResponse({ status: 200, description: 'Riego encontrado.' })
  @ApiResponse({ status: 404, description: 'Riego no encontrado.' })
  @HttpCode(HttpStatus.OK)
  obtenerPorId(@Param('id') id: string) {
    return { id: Number(id), cantidad_ml: 500 };
  }
}