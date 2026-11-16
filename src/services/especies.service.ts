import { Injectable, NotFoundException } from '@nestjs/common';
import { EspecieRepository } from '../repositories/especie.repository';
import { CrearEspecieDto } from '../dto/crear-especie.dto';
import { EspecieMapper } from '../mappers/especie.mapper';

@Injectable()
export class EspeciesService {
  constructor(private readonly especieRepository: EspecieRepository) {}

  async crear(crearEspecieDto: CrearEspecieDto) {
    const creada = await this.especieRepository.create(crearEspecieDto);
    return EspecieMapper.toResponse(creada);
  }

  async obtenerTodas(page: number = 1, limit: number = 10) {
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.especieRepository.findAndCountPaginated(
      skip,
      take,
    );

    return {
      data: data.map((e) => EspecieMapper.toDetailResponse(e)),
      total,
      page: Number(page),
      lastPage: Math.ceil(total / take) || 1,
    };
  }

  async obtenerPorId(id: number) {
    const especie = await this.especieRepository.findByIdWithRelations(Number(id));
    if (!especie) {
      throw new NotFoundException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${id}`,
      });
    }
    return EspecieMapper.toDetailResponse(especie);
  }

  async actualizar(id: number, actualizarDto: Partial<CrearEspecieDto>) {
    const especie = await this.especieRepository.findByIdWithRelations(Number(id));
    if (!especie) {
      throw new NotFoundException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${id}`,
      });
    }
    const actualizada = await this.especieRepository.update(especie, actualizarDto);
    return EspecieMapper.toDetailResponse(actualizada);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const especie = await this.especieRepository.findByIdWithRelations(Number(id));
    if (!especie) {
      throw new NotFoundException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${id}`,
      });
    }
    await this.especieRepository.remove(especie);
    return { message: `La especie con id ${id} ha sido eliminada exitosamente` };
  }
}