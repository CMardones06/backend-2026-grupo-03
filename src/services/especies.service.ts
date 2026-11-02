import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especie } from '../domain/entities/especie.entity';
import { CrearEspecieDto } from '../dto/crear-especie.dto';

@Injectable()
export class EspeciesService {
  constructor(
    @InjectRepository(Especie)
    private readonly especieRepository: Repository<Especie>,
  ) {}

  async crear(crearEspecieDto: CrearEspecieDto): Promise<Especie> {
    const nuevaEspecie = this.especieRepository.create(crearEspecieDto);
    return await this.especieRepository.save(nuevaEspecie);
  }

  async obtenerTodas(page: number = 1, limit: number = 10) {
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.especieRepository.findAndCount({
      take: Number(take),
      skip: Number(skip),
      relations: {
        plantas: true,
      },
    });

    return {
      data,
      total,
      page: Number(page),
      lastPage: Math.ceil(total / take) || 1,
    };
  }

  async obtenerPorId(id: number): Promise<Especie> {
    const especie = await this.especieRepository.findOne({
      where: { id: Number(id) },
      relations: {
        plantas: true,
      },
    });

    if (!especie) {
      throw new NotFoundException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `No existe una especie con id ${id}`,
      });
    }
    return especie;
  }

  async actualizar(id: number, actualizarDto: Partial<CrearEspecieDto>): Promise<Especie> {
    const especie = await this.obtenerPorId(id);

    this.especieRepository.merge(especie, actualizarDto);
    return await this.especieRepository.save(especie);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const especie = await this.obtenerPorId(id);
    await this.especieRepository.remove(especie);
    return { message: `La especie con id ${id} ha sido eliminada exitosamente` };
  }

  async existe(id: number): Promise<boolean> {
    const count = await this.especieRepository.count({
      where: { id: Number(id) },
    });
    return count > 0;
  }
}