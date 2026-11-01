import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PlantasService } from './plantas.service';
import { CrearRiegoDto } from '../dto/crear-riego.dto';

@Injectable()
export class RiegosService {
  private riegos: any[] = [];

  constructor(private readonly plantasService: PlantasService) {}

  crearRiego(datos: CrearRiegoDto) {
    
    const fechaRiego = datos.fecha_riego ? new Date(datos.fecha_riego) : new Date();

  
    if (fechaRiego > new Date()) {
      throw new BadRequestException({
        code: 'INVALID_RIEGO_DATE',
        message: 'La fecha de riego no puede ser una fecha futura',
      });
    }

    const planta = this.plantasService.obtenerPorId(datos.planta_id);

    if (!planta) {
      throw new NotFoundException({
        code: 'RESOURCE_NOT_FOUND',
        message: `La planta con ID ${datos.planta_id} no existe`,
      });
    }

    
    if (planta.estado_salud === 'Muerta' || planta.estado === 'MUERTA') {
      throw new BadRequestException({
        code: 'CANNOT_WATER_DEAD_PLANT',
        message: 'No se puede registrar un riego para una planta en estado muerta',
      });
    }

    const nuevoRiego = {
      id: this.riegos.length > 0 ? Math.max(...this.riegos.map((r) => r.id)) + 1 : 1,
      ...datos,
      fecha_riego: fechaRiego,
    };

    this.riegos.push(nuevoRiego);
    return nuevoRiego;
  }

  obtenerTodos() {
    return this.riegos;
  }
}