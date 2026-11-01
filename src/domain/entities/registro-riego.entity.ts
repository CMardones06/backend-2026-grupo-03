import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Planta } from './planta.entity';

@Entity('registros_riego')
export class RegistroRiego {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  planta_id: number;

  // Cambiado type: 'timestamp' por type: 'datetime' para compatibilidad con SQLite
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_riego: Date;

  @Column({ type: 'int' })
  cantidad_ml: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  observaciones: string;

  @ManyToOne(() => Planta, (planta) => planta.riegos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'planta_id' })
  planta: Planta;
}