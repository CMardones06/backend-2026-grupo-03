import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta, EstadoSalud } from '../domain/entities/planta.entity';
import { Especie } from '../domain/entities/especie.entity';
import { Usuario } from '../domain/entities/usuario.entity';
import { CrearPlantaDto } from '../dto/crear-planta.dto';

@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(Planta)
    private readonly plantaRepository: Repository<Planta>,
    @InjectRepository(Especie)
    private readonly especieRepository: Repository<Especie>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crear(crearPlantaDto: CrearPlantaDto): Promise<Planta> {
   
    const especie = await this.especieRepository.findOne({
      where: { id: Number(crearPlantaDto.especie_id) },
    });
    if (!especie) {
      throw new NotFoundException({
        code: 'ESPECIE_NO_ENCONTRADA',
        message: `La especie con ID ${crearPlantaDto.especie_id} no existe`,
      });
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: Number(crearPlantaDto.usuario_id) },
    });
    if (!usuario) {
      throw new NotFoundException({
        code: 'USUARIO_NO_ENCONTRADO',
        message: `El usuario con ID ${crearPlantaDto.usuario_id} no existe`,
      });
    }

    const nuevaPlanta = this.plantaRepository.create({
      nombre: crearPlantaDto.nombre,
      apodo: crearPlantaDto.apodo,
      ubicacion: crearPlantaDto.ubicacion,
      estado_salud: crearPlantaDto.estado_salud ?? EstadoSalud.SALUDABLE,
      fecha_adquisicion: crearPlantaDto.fecha_adquisicion,
      especie,
      usuario,
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

  async actualizar(
    id: number,
    actualizarDto: Partial<CrearPlantaDto>,
  ): Promise<Planta> {
    const planta = await this.obtenerPorId(id);

    
    if (actualizarDto.especie_id) {
      const especie = await this.especieRepository.findOne({
        where: { id: Number(actualizarDto.especie_id) },
      });
      if (!especie) {
        throw new NotFoundException({
          code: 'ESPECIE_NO_ENCONTRADA',
          message: `La especie con ID ${actualizarDto.especie_id} no existe`,
        });
      }
      planta.especie = especie;
    }

    if (actualizarDto.usuario_id) {
      const usuario = await this.usuarioRepository.findOne({
        where: { id: Number(actualizarDto.usuario_id) },
      });
      if (!usuario) {
        throw new NotFoundException({
          code: 'USUARIO_NO_ENCONTRADO',
          message: `El usuario con ID ${actualizarDto.usuario_id} no existe`,
        });
      }
      planta.usuario = usuario;
    }

    if (actualizarDto.nombre !== undefined) {
      planta.nombre = actualizarDto.nombre;}
    if (actualizarDto.apodo) planta.apodo = actualizarDto.apodo;
    if (actualizarDto.ubicacion) planta.ubicacion = actualizarDto.ubicacion;
    if (actualizarDto.estado_salud)
      planta.estado_salud = actualizarDto.estado_salud;
    if (actualizarDto.fecha_adquisicion !== undefined) {
      planta.fecha_adquisicion = actualizarDto.fecha_adquisicion;
    }

    return await this.plantaRepository.save(planta);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const planta = await this.obtenerPorId(id);
    await this.plantaRepository.remove(planta);
    return { message: `La planta con id ${id} ha sido eliminada exitosamente` };
  }
}