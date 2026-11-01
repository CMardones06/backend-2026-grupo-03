import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../domain/entities/usuario.entity';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create({
      nombre: crearUsuarioDto.nombre,
      email: crearUsuarioDto.email,
      rol: crearUsuarioDto.rol,
      activo: crearUsuarioDto.activo ?? true,
      fecha_registro: new Date(),
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async obtenerTodos(page: number = 1, limit: number = 10) {
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.usuarioRepository.findAndCount({
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

  async obtenerPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: Number(id) },
      relations: {
        plantas: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException({
        code: 'USUARIO_NO_ENCONTRADO',
        message: `No existe un usuario con el id ${id}`,
      });
    }
    return usuario;
  }

  async actualizar(id: number, actualizarDto: Partial<CrearUsuarioDto>): Promise<Usuario> {
    const usuario = await this.obtenerPorId(id);

    this.usuarioRepository.merge(usuario, actualizarDto as any);

    return await this.usuarioRepository.save(usuario);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const usuario = await this.obtenerPorId(id);
    await this.usuarioRepository.remove(usuario);
    return { message: `El usuario con id ${id} ha sido eliminado con éxito` };
  }
}