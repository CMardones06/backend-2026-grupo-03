import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsOrder } from 'typeorm';
import { Usuario } from '../domain/entities/usuario.entity';

type DatosUsuario = Pick<Usuario, 'nombre' | 'email' | 'rol'> & {
  activo?: boolean;
};

type ConsultaUsuarios = {
  rol?: 'admin' | 'user';
  ordenar_por: 'id' | 'nombre' | 'email' | 'rol';
  direccion: 'asc' | 'desc';
  pagina: number;
  limite: number;
};

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  findAll(
    consulta: ConsultaUsuarios,
  ): Promise<[Usuario[], number]> {
    const direccion =
      consulta.direccion === 'asc' ? 'ASC' : 'DESC';

    const orden: FindOptionsOrder<Usuario> = {
      [consulta.ordenar_por]: direccion,
    };

    if (consulta.ordenar_por !== 'id') {
      orden.id = 'ASC';
    }

    return this.repository.findAndCount({
      where: consulta.rol ? { rol: consulta.rol } : {},
      order: orden,
      skip: (consulta.pagina - 1) * consulta.limite,
      take: consulta.limite,
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