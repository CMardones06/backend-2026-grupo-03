import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Especie } from './especie.entity';
import { Usuario } from './usuario.entity';
import { RegistroRiego } from './registro-riego.entity';

export enum EstadoSalud {
  SALUDABLE = 'Saludable',
  REGULAR = 'Regular',
  CRITICO = 'Critico',
  MUERTO = 'Muerto',
}
@Entity('plantas')
export class Planta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  apodo: string;

  @Column({ type: 'date' })
  fecha_adquisicion: Date;

  @Column({ type: 'varchar', length: 50 })
  ubicacion: string;

  @Column({ type: 'varchar', length: 30, default: 'Saludable' })
  estado_salud: string;

  @Column({ type: 'int' })
  especie_id: number;

  @ManyToOne(() => Especie)
  @JoinColumn({ name: 'especie_id' })
  especie: Especie;

  @Column({ type: 'int' })
  usuario_id: number;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.plantas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @OneToMany(() => RegistroRiego, (riego) => riego.planta)
  riegos: RegistroRiego[];
}