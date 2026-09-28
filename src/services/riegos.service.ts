import { Injectable, BadRequestException } from '@nestjs/common';
import { RegistroRiegoRepository } from '../repositories/registro-riego.repository';
import { PlantasService } from './plantas.service';

@Injectable()
export class RiegosService {
  constructor(
    private readonly riegoRepository: RegistroRiegoRepository,
    private readonly plantasService: PlantasService, // Hallazgo #2: Conectado a PlantasService
  ) {}

  crearRiego(datos: any) {
    // Validar fecha futura
    const fechaRiego = new Date(datos.fecha_riego);
    if (fechaRiego > new Date()) {
      throw new BadRequestException({ // Hallazgo #7: 400
        code: 'FECHA_INVALIDA',
        message: 'La fecha de riego no puede ser futura',
      });
    }

    // Hallazgo #2: Obtener la planta real
    const planta = this.plantasService.obtenerPorId(datos.planta_id);

    // Hallazgo #10: Compara 'Muerta'
    if (planta.estado_salud === 'Muerta') {
      throw new BadRequestException({ // Hallazgo #7: 400
        code: 'PLANTA_MUERTA',
        message: 'No se puede registrar riegos para una planta muerta',
      });
    }

    return this.riegoRepository.save(datos);
  }

  obtenerTodos() {
    return this.riegoRepository.findAll(); // Hallazgo #6: Retorna datos reales
  }
}