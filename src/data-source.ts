import { DataSource } from 'typeorm';
import { Especie } from './domain/entities/especie.entity';
import { Planta } from './domain/entities/planta.entity';
import { RegistroRiego } from './domain/entities/registro-riego.entity';
import { Usuario } from './domain/entities/usuario.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_DATABASE || 'database.sqlite',
  entities: [Especie, Planta, RegistroRiego, Usuario],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});