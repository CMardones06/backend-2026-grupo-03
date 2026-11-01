import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Planta } from './planta.entity';

@Entity('especies')
export class Especie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre_comun: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_cientifico: string;

  @Column({ type: 'varchar', length: 50 })
  origen: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Planta, (planta) => planta.especie)
  plantas: Planta[];
}