import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PlantaRepository } from '../repositories/planta.repository';
import { EspeciesService } from './especies.service';

@Injectable()
export class PlantasService {
  constructor(
    private readonly plantaRepository: PlantaRepository,
    private readonly especiesService: EspeciesService, // Hallazgo #4
  ) {}

  crearPlanta(datos: any) {
    // Hallazgo #4: Validación de especie inexistente
    if (!this.especiesService.existe(datos.especie_id)) {
      throw new BadRequestException({ // Hallazgo #7: 400 para reglas de negocio
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${datos.especie_id}`,
      });
    }

    return this.plantaRepository.save(datos);
  }

  obtenerTodas(
    estadoSalud?: string,
    ordenarPor: string = 'id',
    direccion: string = 'asc',
    pagina: number = 1,
    limite: number = 10,
  ) {
    // Hallazgo #9: Validaciones de query params
    if (!['asc', 'desc'].includes(direccion)) {
      throw new BadRequestException({ code: 'DIRECCION_INVALIDA', message: 'direccion debe ser asc o desc' });
    }
    if (limite < 1 || limite > 100) {
      throw new BadRequestException({ code: 'LIMITE_INVALIDO', message: 'limite debe estar entre 1 y 100' });
    }
    if (pagina < 1) {
      throw new BadRequestException({ code: 'PAGINA_INVALIDA', message: 'pagina debe ser mayor o igual a 1' });
    }

    let resultado = this.plantaRepository.findAll();

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

    // Hallazgo #8: Estructura exacta solicitada por la pauta
    return {
      items: datosPaginados,
      total,
      pagina,
      limite,
      total_paginas: totalPaginas,
    };
  }

  obtenerPorId(id: number) {
    const planta = this.plantaRepository.findById(id);
    if (!planta) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }
    return planta;
  }
}import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PlantaRepository } from '../repositories/planta.repository';
import { EspeciesService } from './especies.service';

@Injectable()
export class PlantasService {
  constructor(
    private readonly plantaRepository: PlantaRepository,
    private readonly especiesService: EspeciesService, // Hallazgo #4
  ) {}

  crearPlanta(datos: any) {
    // Hallazgo #4: Validación de especie inexistente
    if (!this.especiesService.existe(datos.especie_id)) {
      throw new BadRequestException({ // Hallazgo #7: 400 para reglas de negocio
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${datos.especie_id}`,
      });
    }

    return this.plantaRepository.save(datos);
  }

  obtenerTodas(
    estadoSalud?: string,
    ordenarPor: string = 'id',
    direccion: string = 'asc',
    pagina: number = 1,
    limite: number = 10,
  ) {
    // Hallazgo #9: Validaciones de query params
    if (!['asc', 'desc'].includes(direccion)) {
      throw new BadRequestException({ code: 'DIRECCION_INVALIDA', message: 'direccion debe ser asc o desc' });
    }
    if (limite < 1 || limite > 100) {
      throw new BadRequestException({ code: 'LIMITE_INVALIDO', message: 'limite debe estar entre 1 y 100' });
    }
    if (pagina < 1) {
      throw new BadRequestException({ code: 'PAGINA_INVALIDA', message: 'pagina debe ser mayor o igual a 1' });
    }

    let resultado = this.plantaRepository.findAll();

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

    // Hallazgo #8: Estructura exacta solicitada por la pauta
    return {
      items: datosPaginados,
      total,
      pagina,
      limite,
      total_paginas: totalPaginas,
    };
  }

  obtenerPorId(id: number) {
    const planta = this.plantaRepository.findById(id);
    if (!planta) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }
    return planta;
  }
}