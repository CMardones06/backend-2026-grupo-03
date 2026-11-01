import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus} from '@nestjs/common';
import { PlantasService } from '../services/plantas.service';
import { CrearPlantaDto } from '../dto/crear-planta.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Plantas')
@Controller('plantas')
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  @Post()
  @ApiOperation({summary:'Registrar una nueva planta'})
  @ApiResponse({ status: 201, description: 'La planta ha sido creada con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
  @HttpCode(HttpStatus.CREATED)
  crear(@Body() datos: CrearPlantaDto) {
    return this.plantasService.crearPlanta(datos);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener el listado de todas las plantas' })
  @ApiResponse({ status: 200, description: 'Lista de plantas obtenida exitosamente.' })
  @HttpCode(HttpStatus.OK)
  obtenerTodas(
    @Query('estado_salud') estadoSalud?: string,
    @Query('ordenar_por') ordenarPor: string = 'id',
    @Query('direccion') direccion: string = 'asc',
    @Query('pagina') pagina: string = '1',
    @Query('limite') limite: string = '10',
  ) {
    return this.plantasService.obtenerTodas(
      estadoSalud,
      ordenarPor,
      direccion,
      Number(pagina),
      Number(limite),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar una planta por su ID' })
  @ApiParam({ name: 'id', description: 'ID único de la planta', example: '1' })
  @ApiResponse({ status: 200, description: 'Planta encontrada.' })
  @ApiResponse({ status: 404, description: 'Planta no encontrada.' })
  @HttpCode(HttpStatus.OK)
  obtenerPorId(@Param('id') id: string) {
    return this.plantasService.obtenerPorId(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar planta por su ID' })
  @ApiParam({ name: 'id', description: 'ID único de la planta', example: '1' })
  @ApiResponse({ status: 200, description: 'Planta encontrada.' })
  @ApiResponse({ status: 404, description: 'Planta no encontrada.' })
  @HttpCode(HttpStatus.OK)
  actualizar(@Param('id') id: string, @Body() datos: CrearPlantaDto) {
    return this.plantasService.actualizar(Number(id), datos);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar planta por su ID' })
  @ApiParam({ name: 'id', description: 'ID único de la planta', example: '1' })
  @ApiResponse({ status: 200, description: 'Planta encontrada.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  eliminar(@Param('id') id: string) {
    this.plantasService.eliminar(Number(id));
    return;
  }
}