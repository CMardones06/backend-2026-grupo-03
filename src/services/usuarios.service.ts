import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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
    const email = crearUsuarioDto.email.trim().toLowerCase();

    
    const existe = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (existe) {
      throw new ConflictException({
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'El correo electrónico ya se encuentra registrado',
      });
    }

    const nuevoUsuario = this.usuarioRepository.create({
      nombre: crearUsuarioDto.nombre,
      email,
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

  async actualizar(
    id: number,
    actualizarDto: Partial<CrearUsuarioDto>,
  ): Promise<Usuario> {
    const usuario = await this.obtenerPorId(id);

    
    if (actualizarDto.email) {
      const email = actualizarDto.email.trim().toLowerCase();
      const existe = await this.usuarioRepository.findOne({
        where: { email },
      });

      if (existe && existe.id !== Number(id)) {
        throw new ConflictException({
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'Ya existe otro usuario con ese correo electrónico',
        });
      }
      actualizarDto.email = email;
    }

    this.usuarioRepository.merge(usuario, actualizarDto as any);

    return await this.usuarioRepository.save(usuario);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const usuario = await this.obtenerPorId(id);
    await this.usuarioRepository.remove(usuario);
    return { message: `El usuario con id ${id} ha sido eliminado con éxito` };
  }
}