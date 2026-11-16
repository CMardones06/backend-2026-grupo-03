import { Usuario } from '../schemas/entities/usuario.entity';

export class UsuarioMapper {
  static toResponse(usuario: Usuario) {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      activo: usuario.activo,
    };
  }

  static toDetailResponse(usuario: Usuario) {
    return {
      ...this.toResponse(usuario),
      plantas: usuario.plantas ?? [],
    };
  }
}