import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroRiego } from '../domain/entities/registro-riego.entity';
import { Planta } from '../domain/entities/planta.entity';
import { CrearRiegoDto } from '../dto/crear-riego.dto';

@Injectable()
export class RiegosService {
  constructor(
    @InjectRepository(RegistroRiego)
    private readonly riegoRepository: Repository<RegistroRiego>,
    @InjectRepository(Planta)
    private readonly plantaRepository: Repository<Planta>,
  ) {}

  async crearRiego(crearRiegoDto: CrearRiegoDto): Promise<RegistroRiego> {
    const fechaRiego = new Date(crearRiegoDto.fecha_riego);
    const ahora = new Date();
    if (fechaRiego > ahora) {
      throw new BadRequestException({
        error: {
          code: 'INVALID_DATE',
          message: 'No se puede registrar un riego con una fecha futura',
          details: [],
        },
      });
    }

    const planta = await this.plantaRepository.findOne({
      where: { id: crearRiegoDto.planta_id },
    });

    if (!planta) {
      throw new NotFoundException({
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'No existe una planta con el ID solicitado',
          details: [],
        },
      });
    }

    if (planta.estado_salud === 'Muerto' || planta.estado_salud === 'Muerta') {
      throw new BadRequestException({
        error: {
          code: 'PLANTA_MUERTA',
          message: 'No se puede registrar riegos para una planta muerta',
        },
      });
    }

    const nuevoRiego = this.riegoRepository.create({
      ...crearRiegoDto,
      fecha_riego: fechaRiego,
    });

    return await this.riegoRepository.save(nuevoRiego);
  }

  async obtenerTodos(page: number = 1, limit: number = 10) {
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.riegoRepository.findAndCount({
      take: Number(take),
      skip: Number(skip),
      relations: {
        planta: true,
      },
    });

    return {
      data,
      total,
      page: Number(page),
      lastPage: Math.ceil(total / take) || 1,
    };
  }

  async obtenerPorId(id: number): Promise<RegistroRiego> {
    const riego = await this.riegoRepository.findOne({
      where: { id: Number(id) },
      relations: {
        planta: true,
      },
    });

    if (!riego) {
      throw new NotFoundException({
        code: 'RIEGO_NO_ENCONTRADO',
        message: `No existe un registro de riego con el id ${id}`,
      });
    }
    return riego;
  }

  async actualizar(id: number, actualizarDto: Partial<CrearRiegoDto>): Promise<RegistroRiego> {
    const riego = await this.obtenerPorId(id);

    if (actualizarDto.fecha_riego) {
      const fechaRiego = new Date(actualizarDto.fecha_riego);
      if (fechaRiego > new Date()) {
        throw new BadRequestException({
          message: 'No se puede actualizar un riego con una fecha futura',
        });
      }
      actualizarDto.fecha_riego = fechaRiego as any;
    }

    this.riegoRepository.merge(riego, actualizarDto);
    return await this.riegoRepository.save(riego);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const riego = await this.obtenerPorId(id);
    await this.riegoRepository.remove(riego);
    return { message: `El registro de riego con id ${id} ha sido eliminado` };
  }
}