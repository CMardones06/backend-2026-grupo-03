import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { ConsultarUsuariosDto } from '../dto/consultar-usuarios.dto';
import { UsuarioMapper } from '../mappers/usuario.mapper';

@Injectable()
export class UsuariosService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async crear(crearUsuarioDto: CrearUsuarioDto) {
    const email = crearUsuarioDto.email.trim().toLowerCase();

    const existe = await this.usuarioRepository.findByEmail(email);
    if (existe) {
      throw new ConflictException({
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'El correo electrónico ya se encuentra registrado',
      });
    }

    const creado = await this.usuarioRepository.create({
      nombre: crearUsuarioDto.nombre,
      email,
      rol: crearUsuarioDto.rol,
      activo: crearUsuarioDto.activo ?? true,
    });

    return UsuarioMapper.toResponse(creado);
  }

  async obtenerTodos(consulta: ConsultarUsuariosDto) {
    const [items, total] = await this.usuarioRepository.findAll({
      busqueda: consulta.busqueda,
      rol: consulta.rol,
      activo: consulta.activo,
      ordenar_por: consulta.ordenar_por ?? 'id',
      direccion: consulta.direccion ?? 'ASC',
      pagina: consulta.pagina ?? 1,
      limite: consulta.limite ?? 10,
    } as any); // <-- Forzamos el tipo aquí para evitar conflictos de TypeScript

    return {
      items: items.map((u) => UsuarioMapper.toResponse(u)),
      total,
      pagina: consulta.pagina ?? 1,
      limite: consulta.limite ?? 10,
      total_paginas: Math.ceil(total / (consulta.limite ?? 10)),
    };
  }

  async obtenerPorId(id: number) {
    const usuario = await this.usuarioRepository.findByIdWithRelations(
      Number(id),
    );

    if (!usuario) {
      throw new NotFoundException({
        code: 'USUARIO_NO_ENCONTRADO',
        message: `No existe un usuario con el id ${id}`,
      });
    }
    return UsuarioMapper.toDetailResponse(usuario);
  }

  async actualizar(id: number, actualizarDto: Partial<CrearUsuarioDto>) {
    const usuario = await this.usuarioRepository.findByIdWithRelations(
      Number(id),
    );

    if (!usuario) {
      throw new NotFoundException({
        code: 'USUARIO_NO_ENCONTRADO',
        message: `No existe un usuario con el id ${id}`,
      });
    }

    if (actualizarDto.email) {
      const email = actualizarDto.email.trim().toLowerCase();
      const existe = await this.usuarioRepository.findByEmail(email);

      if (existe && existe.id !== Number(id)) {
        throw new ConflictException({
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'Ya existe otro usuario con ese correo electrónico',
        });
      }
      actualizarDto.email = email;
    }

    const actualizado = await this.usuarioRepository.update(
      usuario,
      actualizarDto,
    );
    return UsuarioMapper.toDetailResponse(actualizado);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const usuario = await this.usuarioRepository.findByIdWithRelations(
      Number(id),
    );

    if (!usuario) {
      throw new NotFoundException({
        code: 'USUARIO_NO_ENCONTRADO',
        message: `No existe un usuario con el id ${id}`,
      });
    }

    await this.usuarioRepository.remove(usuario);
    return { message: `El usuario con id ${id} ha sido eliminado con éxito` };
  }
}