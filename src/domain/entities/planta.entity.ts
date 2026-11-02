import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Especie } from './especie.entity';
import { RegistroRiego } from './registro-riego.entity';
import { Usuario } from './usuario.entity';

export enum EstadoSalud {
  EXCELENTE = 'Excelente',
  SALUDABLE = 'Saludable',
  ENFERMA = 'Enferma',
  CRITICA = 'Crítica',
  MUERTA = 'Muerta',
}

@Entity('plantas')
export class Planta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  ubicacion: string;

  @Column({ length: 30, default: EstadoSalud.SALUDABLE })
  estado_salud: string;

  @Column({ type: 'date', nullable: true })
  fecha_ingreso?: Date;

  @Column({ nullable: true })
  especie_id?: number;

  @Column({ nullable: true })
  apodo?: string;

  @Column({ type: 'date', nullable: true })
  fecha_adquisicion?: Date;

  @Column({ nullable: true })
  usuario_id?: number;

  @ManyToOne(() => Especie, (especie: Especie) => especie.plantas, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'especie_id' })
  especie?: Especie;

  @ManyToOne(() => Usuario, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuario_id' })
  usuario?: Usuario;

  @OneToMany(() => RegistroRiego, (riego: RegistroRiego) => riego.planta)
  riegos: RegistroRiego[];
}