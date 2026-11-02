import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../domain/entities/usuario.entity';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { ConsultarUsuariosDto } from '../dto/consultar-usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly usuariosConsultaRepository: UsuarioRepository,
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create({
      nombre: crearUsuarioDto.nombre,
      email: crearUsuarioDto.email,
      rol: crearUsuarioDto.rol,
      activo: crearUsuarioDto.activo ?? true,
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async obtenerTodos(consulta: ConsultarUsuariosDto) {
    const [items, total] =
      await this.usuariosConsultaRepository.findAll(consulta);

    return {
      items,
      total,
      pagina: consulta.pagina,
      limite: consulta.limite,
      total_paginas: Math.ceil(total / consulta.limite),
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