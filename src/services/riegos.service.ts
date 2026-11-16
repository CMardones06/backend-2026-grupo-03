import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EstadoSalud } from '../schemas/entities/planta.entity';
import { CrearRiegoDto } from '../dto/crear-riego.dto';
import { RegistroRiegoRepository } from '../repositories/registro-riego.repository';
import { PlantaRepository } from '../repositories/planta.repository';
import { RegistroRiegoMapper } from '../mappers/registro-riego.mapper';

@Injectable()
export class RiegosService {
  constructor(
    private readonly registroRiegoRepository: RegistroRiegoRepository,
    private readonly plantaRepository: PlantaRepository,
  ) {}

  private esPlantaMuerta(estadoSalud?: string): boolean {
    const estado = String(estadoSalud || '').toUpperCase();
    return (
      estadoSalud === EstadoSalud.MUERTA ||
      estado === 'MUERTA' ||
      estado === 'MUERTO'
    );
  }

  async crear(crearDto: CrearRiegoDto) {
    const plantaExiste = await this.plantaRepository.findById(
      Number(crearDto.planta_id),
    );

    if (!plantaExiste) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `No se puede registrar el riego porque la planta con id ${crearDto.planta_id} no existe`,
      });
    }

    if (this.esPlantaMuerta(plantaExiste.estado_salud)) {
      throw new BadRequestException({
        code: 'CANNOT_WATER_DEAD_PLANT',
        message:
          'No se puede registrar un riego para una planta en estado muerta',
      });
    }

    const fechaRiego = crearDto.fecha_riego
      ? new Date(crearDto.fecha_riego)
      : new Date();

    if (fechaRiego > new Date()) {
      throw new BadRequestException({
        code: 'INVALID_RIEGO_DATE',
        message:
          'La fecha de riego no puede ser posterior a la fecha y hora actual',
      });
    }

    const creado = await this.registroRiegoRepository.create({
      planta_id: plantaExiste.id,
      planta: plantaExiste,
      cantidad_ml: crearDto.cantidad_ml,
      observaciones: crearDto.observaciones,
      fecha_riego: fechaRiego,
    });

    return RegistroRiegoMapper.toResponse(creado);
  }

  async obtenerTodos(page: number = 1, limit: number = 10) {
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const [data, total] =
      await this.registroRiegoRepository.findAndCountPaginated(skip, take);

    return {
      data: data.map((r) => RegistroRiegoMapper.toResponse(r)),
      total,
      page: Number(page),
      lastPage: Math.ceil(total / take) || 1,
    };
  }

  async obtenerPorId(id: number) {
    const registro = await this.registroRiegoRepository.findByIdWithRelations(
      Number(id),
    );

    if (!registro) {
      throw new NotFoundException({
        code: 'REGISTRO_RIEGO_NO_ENCONTRADO',
        message: `No existe un registro de riego con id ${id}`,
      });
    }

    return RegistroRiegoMapper.toResponse(registro);
  }

  async actualizar(id: number, actualizarDto: Partial<CrearRiegoDto>) {
    const registro = await this.registroRiegoRepository.findByIdWithRelations(
      Number(id),
    );

    if (!registro) {
      throw new NotFoundException({
        code: 'REGISTRO_RIEGO_NO_ENCONTRADO',
        message: `No existe un registro de riego con id ${id}`,
      });
    }

    if (actualizarDto.planta_id !== undefined) {
      const plantaExiste = await this.plantaRepository.findById(
        Number(actualizarDto.planta_id),
      );

      if (!plantaExiste) {
        throw new NotFoundException({
          code: 'PLANTA_NO_ENCONTRADA',
          message: `La planta con id ${actualizarDto.planta_id} no existe`,
        });
      }

      if (this.esPlantaMuerta(plantaExiste.estado_salud)) {
        throw new BadRequestException({
          code: 'CANNOT_WATER_DEAD_PLANT',
          message: 'No se puede asociar el riego a una planta en estado muerta',
        });
      }

      registro.planta = plantaExiste;
      registro.planta_id = plantaExiste.id;
    }

    let nuevaFecha: Date | undefined;
    if (actualizarDto.fecha_riego !== undefined) {
      nuevaFecha = new Date(actualizarDto.fecha_riego);
      if (nuevaFecha > new Date()) {
        throw new BadRequestException({
          code: 'INVALID_RIEGO_DATE',
          message:
            'La fecha de riego no puede ser posterior a la fecha y hora actual',
        });
      }
    }

    const actualizado = await this.registroRiegoRepository.update(registro, {
      ...(actualizarDto.cantidad_ml !== undefined && {
        cantidad_ml: actualizarDto.cantidad_ml,
      }),
      ...(actualizarDto.observaciones !== undefined && {
        observaciones: actualizarDto.observaciones,
      }),
      ...(nuevaFecha !== undefined && { fecha_riego: nuevaFecha }),
    });

    return RegistroRiegoMapper.toResponse(actualizado);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const registro = await this.registroRiegoRepository.findByIdWithRelations(
      Number(id),
    );

    if (!registro) {
      throw new NotFoundException({
        code: 'REGISTRO_RIEGO_NO_ENCONTRADO',
        message: `No existe un registro de riego con id ${id}`,
      });
    }

    await this.registroRiegoRepository.remove(registro);

    return {
      message: `El registro de riego con id ${id} ha sido eliminado exitosamente`,
    };
  }
}