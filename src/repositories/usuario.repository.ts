import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsOrder } from 'typeorm';
import { Usuario } from '../schemas/entities/usuario.entity';

type DatosUsuario = Pick<Usuario, 'nombre' | 'email' | 'rol'> & {
  activo?: boolean;
  password_hash?: string;
  token_version?: number;
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

  findAll(consulta: ConsultaUsuarios): Promise<[Usuario[], number]> {
    const direccion = consulta.direccion === 'asc' ? 'ASC' : 'DESC';

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

  findByIdWithRelations(id: number): Promise<Usuario | null> {
    return this.repository.findOne({
      where: { id },
      relations: { plantas: true },
    });
  }

  findByEmail(email: string): Promise<Usuario | null> {
    return this.repository.findOneBy({ email: email.trim().toLowerCase() });
  }

  create(datos: DatosUsuario): Promise<Usuario> {
    const usuario = this.repository.create({
      ...datos,
      email: datos.email.trim().toLowerCase(),
      activo: datos.activo ?? true,
      token_version: datos.token_version ?? 1,
    });
    return this.repository.save(usuario);
  }

  update(usuario: Usuario, datos: Partial<DatosUsuario>): Promise<Usuario> {
    this.repository.merge(usuario, datos);
    return this.repository.save(usuario);
  }

  async incrementTokenVersion(usuarioId: number): Promise<void> {
    await this.repository.increment({ id: usuarioId }, 'token_version', 1);
  }

  async updatePasswordAndInvalidateSessions(
    usuarioId: number,
    newPasswordHash: string,
  ): Promise<void> {
    const usuario = await this.findById(usuarioId);
    if (!usuario) return;
    usuario.password_hash = newPasswordHash;
    usuario.token_version = (usuario.token_version ?? 1) + 1;
    await this.repository.save(usuario);
  }

  async remove(usuario: Usuario): Promise<void> {
    await this.repository.remove(usuario);
  }
}
