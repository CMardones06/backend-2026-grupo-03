import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  obtenerTodos() {
    return this.usuarioRepository.findAll();
  }

  async obtenerPorId(id: number) {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new NotFoundException(
        `No existe un usuario con ID ${id}`,
      );
    }

    return usuario;
  }

  async crear(datos: CrearUsuarioDto) {
    const email = datos.email.trim().toLowerCase();

    const existente =
      await this.usuarioRepository.findByEmail(email);

    if (existente) {
      throw new ConflictException(
        'Ya existe un usuario con ese correo electrónico',
      );
    }

    return this.usuarioRepository.create({
      ...datos,
      email,
    });
  }

  async actualizar(id: number, datos: CrearUsuarioDto) {
    const usuario = await this.obtenerPorId(id);
    const email = datos.email.trim().toLowerCase();

    const existente =
      await this.usuarioRepository.findByEmail(email);

    if (existente && existente.id !== id) {
      throw new ConflictException(
        'Ya existe otro usuario con ese correo electrónico',
      );
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