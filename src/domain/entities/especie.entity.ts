import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Planta } from './planta.entity';

export enum Luz_Requerida {
  DIRECTA = 'Directa',
  INDIRECTA = 'Indirecta',
  SOMBRA = 'Sombra',
  POCA_LUZ = 'Poca luz',
}
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

  @Column({ type: 'int' })
  frec_riego: number;

  @Column({ type: 'varchar'})
  luz_req: Luz_Requerida;
  
  @OneToMany(() => Planta, (planta) => planta.especie)
  plantas: Planta[];
}