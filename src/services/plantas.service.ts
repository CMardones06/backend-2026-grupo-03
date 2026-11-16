import { Injectable, NotFoundException } from '@nestjs/common';
import { EstadoSalud } from '../schemas/entities/planta.entity';
import { CrearPlantaDto } from '../dto/crear-planta.dto';
import { PlantaRepository } from '../repositories/planta.repository';
import { EspecieRepository } from '../repositories/especie.repository';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { PlantaMapper } from '../mappers/planta.mapper';

@Injectable()
export class PlantasService {
  constructor(
    private readonly plantaRepository: PlantaRepository,
    private readonly especieRepository: EspecieRepository,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async crear(crearPlantaDto: CrearPlantaDto) {
    const especie = await this.especieRepository.findById(
      Number(crearPlantaDto.especie_id),
    );
    if (!especie) {
      throw new NotFoundException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `La especie con ID ${crearPlantaDto.especie_id} no existe`,
      });
    }

    const usuario = await this.usuarioRepository.findById(
      Number(crearPlantaDto.usuario_id),
    );
    if (!usuario) {
      throw new NotFoundException({
        code: 'USUARIO_NO_ENCONTRADO',
        message: `El usuario con ID ${crearPlantaDto.usuario_id} no existe`,
      });
    }

    const creada = await this.plantaRepository.create({
      apodo: crearPlantaDto.apodo,
      ubicacion: crearPlantaDto.ubicacion,
      estado_salud: crearPlantaDto.estado_salud ?? EstadoSalud.SALUDABLE,
      fecha_adquisicion: crearPlantaDto.fecha_adquisicion,
      especie,
      usuario,
    });

    return PlantaMapper.toResponse(creada);
  }

  async obtenerTodas(page: number = 1, limit: number = 10) {
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.plantaRepository.findAndCountPaginated(
      skip,
      take,
    );

    return {
      data: data.map((p) => PlantaMapper.toResponse(p)),
      total,
      page: Number(page),
      lastPage: Math.ceil(total / take) || 1,
    };
  }

  async obtenerPorId(id: number) {
    const planta = await this.plantaRepository.findByIdWithRelations(Number(id));
    if (!planta) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }
    return PlantaMapper.toResponse(planta);
  }

  async actualizar(id: number, actualizarDto: Partial<CrearPlantaDto>) {
    const planta = await this.plantaRepository.findByIdWithRelations(Number(id));
    if (!planta) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }

    if (actualizarDto.especie_id !== undefined) {
      const especie = await this.especieRepository.findById(
        Number(actualizarDto.especie_id),
      );
      if (!especie) {
        throw new NotFoundException({
          code: 'ESPECIE_NO_ENCONTRADA',
          message: `La especie con ID ${actualizarDto.especie_id} no existe`,
        });
      }
      planta.especie = especie;
      planta.especie_id = especie.id;
    }

    if (actualizarDto.usuario_id !== undefined) {
      const usuario = await this.usuarioRepository.findById(
        Number(actualizarDto.usuario_id),
      );
      if (!usuario) {
        throw new NotFoundException({
          code: 'USUARIO_NO_ENCONTRADO',
          message: `El usuario con ID ${actualizarDto.usuario_id} no existe`,
        });
      }
      planta.usuario = usuario;
      planta.usuario_id = usuario.id;
    }

    if (actualizarDto.apodo !== undefined) planta.apodo = actualizarDto.apodo;
    if (actualizarDto.ubicacion !== undefined) {
      planta.ubicacion = actualizarDto.ubicacion;
    }
    if (actualizarDto.estado_salud !== undefined) {
      planta.estado_salud = actualizarDto.estado_salud;
    }
    if (actualizarDto.fecha_adquisicion !== undefined) {
      planta.fecha_adquisicion = actualizarDto.fecha_adquisicion;
    }

    const actualizada = await this.plantaRepository.save(planta);
    return PlantaMapper.toResponse(actualizada);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const planta = await this.plantaRepository.findByIdWithRelations(Number(id));
    if (!planta) {
      throw new NotFoundException({
        code: 'PLANTA_NO_ENCONTRADA',
        message: `La planta con ID ${id} no existe`,
      });
    }
    await this.plantaRepository.remove(planta);
    return { message: `La planta con id ${id} ha sido eliminada exitosamente` };
  }
}