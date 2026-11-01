import { Injectable, BadRequestException } from '@nestjs/common';
import { PlantasService } from './plantas.service';

@Injectable()
export class RiegosService {
  private riegos: any[] = [];

  constructor(private readonly plantasService: PlantasService) {}

  crearRiego(datos: any) {
    // Validar que la fecha no sea futura
    const fechaRiego = new Date(datos.fecha_riego);
    if (fechaRiego > new Date()) {
      throw new BadRequestException({
        code: 'FECHA_INVALIDA',
        message: 'La fecha de riego no puede ser futura',
      });
    }

    // Obtiene la planta (si no existe, obtenerPorId lanza NotFoundException)
    const planta = this.plantasService.obtenerPorId(datos.planta_id);

    // Valida la regla de negocio de planta muerta
    if (planta.estado_salud === 'Muerta') {
      throw new BadRequestException({
        code: 'PLANTA_MUERTA',
        message: 'No se puede registrar riegos para una planta muerta',
      });
    }

    const nuevoRiego = {
      id: this.riegos.length > 0 ? Math.max(...this.riegos.map((r) => r.id)) + 1 : 1,
      ...datos,
    };

    this.riegos.push(nuevoRiego);
    return nuevoRiego;
  }

  obtenerTodos() {
    return this.riegos;
  }
}