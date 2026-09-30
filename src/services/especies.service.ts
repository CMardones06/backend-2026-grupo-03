import { Injectable, NotFoundException } from '@nestjs/common';
import { EspecieRepository } from '../repositories/especie.repository';

@Injectable()
export class EspeciesService {
  constructor(private readonly especieRepository: EspecieRepository) {}

  crear(datos: any) {
    return this.especieRepository.save(datos);
  }

  obtenerTodas() {
    return this.especieRepository.findAll();
  }

  obtenerPorId(id: number) {
    const especie = this.especieRepository.findById(id);
    if (!especie) {
      throw new NotFoundException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${id}`,
      });
    }
    return especie;
  }

  existe(id: number): boolean {
    return !!this.especieRepository.findById(id);
  }
}