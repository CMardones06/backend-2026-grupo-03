import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EspeciesService } from './especies.service';

@Injectable()
export class PlantasService {
  private plantas: any[] = [];

  constructor(private readonly especiesService: EspeciesService) {}

  crearPlanta(datos: any) {
    if (!this.especiesService.existe(datos.especie_id)) {
      throw new BadRequestException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${datos.especie_id}`,
      });
    }

    const nuevaPlanta = {
      id: this.plantas.length > 0 ? Math.max(...this.plantas.map((p) => p.id)) + 1 : 1,
      ...datos,
    };

    this.plantas.push(nuevaPlanta);
    return nuevaPlanta;
  }

  obtenerTodas(
    estadoSalud?: string,
    ordenarPor: string = 'id',
    direccion: string = 'asc',
    pagina: number = 1,
    limite: number = 10,
  ) {
    if (!['asc', 'desc'].includes(direccion)) {
      throw new BadRequestException({ code: 'DIRECCION_INVALIDA', message: 'direccion debe ser asc o desc' });
    }
    if (limite < 1 || limite > 100) {
      throw new BadRequestException({ code: 'LIMITE_INVALIDO', message: 'limite debe estar entre 1 y 100' });
    }
    if (pagina < 1) {
      throw new BadRequestException({ code: 'PAGINA_INVALIDA', message: 'pagina debe ser mayor o igual a 1' });
    }

    let resultado = [...this.plantas];

    if (estadoSalud) {
      resultado = resultado.filter((p) => p.estado_salud === estadoSalud);
    }

    resultado.sort((a, b) => {
      if (a[ordenarPor] < b[ordenarPor]) return direccion === 'asc' ? -1 : 1;
      if (a[ordenarPor] > b[ordenarPor]) return direccion === 'asc' ? 1 : -1;
      return 0;
    });

    const total = resultado.length;
    const totalPaginas = Math.ceil(total / limite) || 1;
    const startIndex = (pagina - 1) * limite;
    const datosPaginados = resultado.slice(startIndex, startIndex + limite);

    return {
      items: datosPaginados,
      total,
      pagina,
      limite,
      total_paginas: totalPaginas,
    };
  }

  obtenerPorId(id: number) {
    const planta = this.plantas.find((p) => Number(p.id) === Number(id));
    if (!planta) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }
    return planta;
  }

  actualizar(id: number, datos: any) {
    const index = this.plantas.findIndex((p) => Number(p.id) === Number(id));
    if (index === -1) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }

    if (datos.especie_id && !this.especiesService.existe(datos.especie_id)) {
      throw new BadRequestException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${datos.especie_id}`,
      });
    }

    this.plantas[index] = { ...this.plantas[index], ...datos };
    return this.plantas[index];
  }

  eliminar(id: number) {
    const index = this.plantas.findIndex((p) => Number(p.id) === Number(id));
    if (index === -1) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }

    this.plantas.splice(index, 1);
  }
}