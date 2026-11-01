import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../domain/entities/usuario.entity';

type DatosUsuario = Pick<Usuario, 'nombre' | 'email' | 'rol'> & {
  activo?: boolean;
};

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.repository.find({
      order: { id: 'ASC' },
    });
  }

  findById(id: number): Promise<Usuario | null> {
    return this.repository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<Usuario | null> {
    return this.repository.findOneBy({ email });
  }

  create(datos: DatosUsuario): Promise<Usuario> {
    const usuario = this.repository.create({
      ...datos,
      activo: datos.activo ?? true,
    });

    return this.repository.save(usuario);
  }

  update(usuario: Usuario, datos: DatosUsuario): Promise<Usuario> {
    this.repository.merge(usuario, datos);

    return this.repository.save(usuario);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}