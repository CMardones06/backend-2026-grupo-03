import { Injectable } from '@nestjs/common';
import { Usuario } from '../domain/usuario.entity';

@Injectable()
export class UsuarioRepository {
  private readonly usuarios: Usuario[] = [];

  findAll(): Usuario[] {
    return this.usuarios;
  }

  save(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }
}