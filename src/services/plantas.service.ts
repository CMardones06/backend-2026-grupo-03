import { Injectable } from '@nestjs/common';

@Injectable()
export class PlantasService {
  private plantas: any[] = [];

  crearPlanta(datos: any) {
    const nuevaPlanta = {
      id: this.plantas.length + 1,
      ...datos,
    };

    this.plantas.push(nuevaPlanta);
    return nuevaPlanta;
  }

  obtenerTodas() {
    return this.plantas;
  }
}