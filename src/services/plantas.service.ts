import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class PlantasService {
  private plantas = [];
  private especies = [];

  crearPlanta(datos: any) {
    const especie = this.especies.find(e => e.id === datos.especie_id);

    if (!especie) {
      throw new UnprocessableEntityException({
        code: 'ESPECIE_REQUERIDA',
        message: 'Debe existir la especie para crear la planta'
      });
    }

    const nuevaPlanta = { id: this.plantas.length + 1, ...datos };
    this.plantas.push(nuevaPlanta);
    return nuevaPlanta;
  }
}