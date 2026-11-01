import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Especie } from './domain/entities/especie.entity';
import { Planta } from './domain/entities/planta.entity';
import { RegistroRiego } from './domain/entities/registro-riego.entity';
import { Usuario } from './domain/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_DATABASE || 'database.sqlite',
      entities: [Especie, Planta, RegistroRiego, Usuario],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Especie, Planta, RegistroRiego, Usuario]),
  ],
})
export class AppModule {}