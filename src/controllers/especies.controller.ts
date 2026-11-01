import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { EspeciesService } from '../services/especies.service';
import { CrearEspecieDto } from '../dto/crear-especie.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
@ApiTags('Especies')
@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  @ApiOperation({summary:'Registrar una nueva especie'})
  @ApiResponse({ status: 201, description: 'La especie ha sido creada con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
  @HttpCode(HttpStatus.CREATED)
  crear(@Body() datos: CrearEspecieDto) {
    return this.especiesService.crear(datos);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener el listado de todas las especies' })
  @ApiResponse({ status: 200, description: 'Lista de especies obtenida exitosamente.' })
  obtenerTodas() {
    return this.especiesService.obtenerTodas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener especie por ID' })
  @ApiParam({ name: 'id', description: 'ID único de la Especie', example: '1' })
  @ApiResponse({ status: 200, description: 'Especie encontrada.' })
  @ApiResponse({ status: 404, description: 'Especie no encontrada.' })
  obtenerPorId(@Param('id') id: string) {
    return this.especiesService.obtenerPorId(Number(id));
  }
}