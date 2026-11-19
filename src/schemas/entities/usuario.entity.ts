import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Planta } from './planta.entity';
import { RefreshToken } from './refresh-token.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 255, nullable: true })
  password_hash: string;

  @Column({ length: 50, default: 'user' })
  rol: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'integer', default: 1 })
  token_version: number;

  @OneToMany(() => Planta, (planta: Planta) => planta.usuario)
  plantas: Planta[];

  @OneToMany(() => RefreshToken, (token: RefreshToken) => token.usuario)
  refresh_tokens: RefreshToken[];
}
