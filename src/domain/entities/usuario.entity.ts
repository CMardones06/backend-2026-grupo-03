import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn ,OneToMany } from 'typeorm';
import { Planta} from './planta.entity';
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  rol: string;

  @CreateDateColumn({ type: 'date' })
  fecha_registro: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @OneToMany(() => Planta, (planta: Planta) => planta.usuario)
  plantas: Planta[];
}