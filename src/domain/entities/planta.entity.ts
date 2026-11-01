import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Especie } from './especie.entity';
import { RegistroRiego } from './registro-riego.entity';

@Entity('plantas')
export class Planta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  ubicacion: string;

  @Column({ type: 'varchar', length: 30, default: 'Saludable' })
  estado_salud: string;

  @Column({ type: 'date' })
  fecha_ingreso: Date;

  @Column({ type: 'int' })
  especie_id: number;

  @ManyToOne(() => Especie, (especie) => especie.plantas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'especie_id' })
  especie: Especie;

  @OneToMany(() => RegistroRiego, (riego) => riego.planta)
  riegos: RegistroRiego[];
}