import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class EspeciesService {
  private especies: any[] = [];

  crear(datos: any) {
    const nuevaEspecie = {
      id: this.especies.length > 0 ? Math.max(...this.especies.map((e) => e.id)) + 1 : 1,
      ...datos,
    };
    this.especies.push(nuevaEspecie);
    return nuevaEspecie;
  }

  obtenerTodas() {
    return this.especies;
  }

  obtenerPorId(id: number) {
    const especie = this.especies.find((e) => Number(e.id) === Number(id));
    if (!especie) {
      throw new NotFoundException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${id}`,
      });
    }
    return especie;
  }

  existe(id: number): boolean {
    return this.especies.some((e) => Number(e.id) === Number(id));
  }
}