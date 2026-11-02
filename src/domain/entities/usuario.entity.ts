import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Planta } from './planta.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 50 })
  rol: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Planta, (planta: Planta) => planta.usuario)
  plantas: Planta[];
}