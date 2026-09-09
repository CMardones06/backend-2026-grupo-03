import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';

@Injectable()
export class RiegosService {
  private riegos = [];
  private plantas = [];

  crearRiego(datos: any) {
    const fechaActual = new Date();
    const fechaIngresada = new Date(datos.fecha_riego);

    if (fechaIngresada > fechaActual) {
      throw new UnprocessableEntityException({
        code: 'FECHA_INVALIDA',
        message: 'La fecha del riego no puede ser futura'
      });
    }

    const planta = this.plantas.find(p => p.id === datos.planta_id);
    if (!planta) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: 'No existe la planta especificada'
      });
    }

    if (planta.estado_salud === 'Muerta') {
      throw new UnprocessableEntityException({
        code: 'PLANTA_MUERTA',
        message: 'No se puede registrar riego a una planta muerta'
      });
    }

    const nuevoRiego = { id: this.riegos.length + 1, ...datos };
    this.riegos.push(nuevoRiego);
    return nuevoRiego;
  }
}