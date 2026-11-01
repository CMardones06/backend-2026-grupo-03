import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { ConsultarUsuariosDto } from '../dto/consultar-usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async obtenerTodos(consulta: ConsultarUsuariosDto) {
    const [items, total] = await this.usuarioRepository.findAll(consulta);

    return {
      items,
      total,
      pagina: consulta.pagina,
      limite: consulta.limite,
      total_paginas: Math.ceil(total / consulta.limite),
    };
  }

  async obtenerPorId(id: number) {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new NotFoundException({
        code: 'RESOURCE_NOT_FOUND',
        message: `No existe un usuario con ID ${id}`,
      });
    }

    return usuario;
  }

  async crear(datos: CrearUsuarioDto) {
    const email = datos.email.trim().toLowerCase();

    const existente = await this.usuarioRepository.findByEmail(email);

    if (existente) {
      throw new ConflictException({
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'El correo electrónico ya se encuentra registrado.',
      });
    }

    return this.usuarioRepository.create({
      ...datos,
      email,
    });
  }

  async actualizar(id: number, datos: CrearUsuarioDto) {
    const usuario = await this.obtenerPorId(id);
    const email = datos.email.trim().toLowerCase();

    const existente = await this.usuarioRepository.findByEmail(email);

    if (existente && existente.id !== id) {
      throw new ConflictException({
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'Ya existe otro usuario con ese correo electrónico.',
      });
    }

    return this.usuarioRepository.update(usuario, {
      ...datos,
      email,
    });
  }

  async eliminar(id: number): Promise<void> {
    await this.obtenerPorId(id);
    await this.usuarioRepository.delete(id);
  }
}