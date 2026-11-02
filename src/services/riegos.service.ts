import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroRiego } from '../domain/entities/registro-riego.entity';
import { Planta } from '../domain/entities/planta.entity';
import { CrearRiegoDto } from '../dto/crear-riego.dto';

@Injectable()
export class RiegosService {
  constructor(
    @InjectRepository(RegistroRiego)
    private readonly registroRiegoRepository: Repository<RegistroRiego>,
    @InjectRepository(Planta)
    private readonly plantaRepository: Repository<Planta>,
  ) {}

  async crear(crearDto: CrearRiegoDto): Promise<RegistroRiego> {
    const plantaExiste = await this.plantaRepository.findOne({
      where: { id: Number(crearDto.planta_id) },
    });

    if (!plantaExiste) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `No se puede registrar el riego porque la planta con id ${crearDto.planta_id} no existe`,
      });
    }

    const estadoSalud = String(plantaExiste.estado_salud || '').toUpperCase();
    if (estadoSalud === 'MUERTO' || estadoSalud === 'MUERTA') {
      throw new BadRequestException({
        code: 'CANNOT_WATER_DEAD_PLANT',
        message: 'No se puede registrar un riego para una planta en estado muerta',
      });
    }

    const fechaRiego = crearDto.fecha_riego
      ? new Date(crearDto.fecha_riego)
      : new Date();

    if (fechaRiego > new Date()) {
      throw new BadRequestException({
        code: 'INVALID_RIEGO_DATE',
        message: 'La fecha de riego no puede ser posterior a la fecha y hora actual',
      });
    }

    const nuevoRegistro = this.registroRiegoRepository.create({
      ...crearDto,
      planta: plantaExiste,
      fecha_riego: fechaRiego as any,
    });

    return await this.registroRiegoRepository.save(nuevoRegistro);
  }

  async obtenerTodos(page: number = 1, limit: number = 10) {
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.registroRiegoRepository.findAndCount({
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
    const registro = await this.registroRiegoRepository.findOne({
      where: { id: Number(id) },
      relations: {
        planta: true,
      },
    });

    if (!registro) {
      throw new NotFoundException({
        code: 'REGISTRO_RIEGO_NO_ENCONTRADO',
        message: `No existe un registro de riego con id ${id}`,
      });
    }

    return registro;
  }

  async actualizar(
    id: number,
    actualizarDto: Partial<CrearRiegoDto>,
  ): Promise<RegistroRiego> {
    const registro = await this.obtenerPorId(id);

    if (actualizarDto.planta_id) {
      const plantaExiste = await this.plantaRepository.findOne({
        where: { id: Number(actualizarDto.planta_id) },
      });
      if (!plantaExiste) {
        throw new NotFoundException({
          code: 'PLANTA_NO_ENCONTRADA',
          message: `La planta con id ${actualizarDto.planta_id} no existe`,
        });
      }

       Regla de Negocio al actualizar: Prohibición de regar planta muerta
      const estadoSalud = String(plantaExiste.estado_salud || '').toUpperCase();
      if (estadoSalud === 'MUERTO' || estadoSalud === 'MUERTA') {
        throw new BadRequestException({
          code: 'CANNOT_WATER_DEAD_PLANT',
          message: 'No se puede asociar el riego a una planta en estado muerta',
        });
      }
    }

    if (actualizarDto.fecha_riego) {
      const fechaRiego = new Date(actualizarDto.fecha_riego);
      if (fechaRiego > new Date()) {
        throw new BadRequestException({
          code: 'INVALID_RIEGO_DATE',
          message: 'La fecha de riego no puede ser posterior a la fecha y hora actual',
        });
      }
    }

    this.registroRiegoRepository.merge(registro, actualizarDto as any);
    return await this.registroRiegoRepository.save(registro);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const registro = await this.obtenerPorId(id);
    await this.registroRiegoRepository.remove(registro);
    return {
      message: `El registro de riego con id ${id} ha sido eliminado exitosamente`,
    };
  }
}