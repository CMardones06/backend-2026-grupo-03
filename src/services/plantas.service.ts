import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from '../domain/entities/planta.entity';
import { CrearPlantaDto } from '../dto/crear-planta.dto';

@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(Planta)
    private readonly plantaRepository: Repository<Planta>,
  ) {}

  async crear(crearPlantaDto: CrearPlantaDto): Promise<Planta> {
    const nuevaPlanta = this.plantaRepository.create({
      ...crearPlantaDto,
      estado_salud: crearPlantaDto.estado_salud || 'Saludable',
      fecha_adquisicion: new Date(crearPlantaDto.fecha_adquisicion),
    });
    return await this.plantaRepository.save(nuevaPlanta);
  }

  async obtenerTodas(page: number = 1, limit: number = 10) {
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.plantaRepository.findAndCount({
      take: Number(take),
      skip: Number(skip),
      relations: {
        especie: true,
        usuario: true,
        riegos: true,
      },
    });

    return {
      data,
      total,
      page: Number(page),
      lastPage: Math.ceil(total / take) || 1,
    };
  }

  async obtenerPorId(id: number): Promise<Planta> {
    const planta = await this.plantaRepository.findOne({
      where: { id: Number(id) },
      relations: {
        especie: true,
        usuario: true,
        riegos: true,
      },
    });

    if (!planta) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }
    return planta;
  }

  async actualizar(id: number, actualizarDto: Partial<CrearPlantaDto>): Promise<Planta> {
    const planta = await this.obtenerPorId(id);

    if (actualizarDto.fecha_adquisicion) {
      actualizarDto.fecha_adquisicion = new Date(actualizarDto.fecha_adquisicion) as any;
    }

    this.plantaRepository.merge(planta, actualizarDto);
    return await this.plantaRepository.save(planta);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const planta = await this.obtenerPorId(id);
    await this.plantaRepository.remove(planta);
    return { message: `La planta con id ${id} ha sido eliminada exitosamente` };
  }
}