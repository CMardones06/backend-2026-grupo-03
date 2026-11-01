import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Especie } from './domain/entities/especie.entity';
import { Planta } from './domain/entities/planta.entity';
import { RegistroRiego } from './domain/entities/registro-riego.entity';
import { Usuario } from './domain/entities/usuario.entity';

import { PlantasController } from './controllers/plantas.controller';
import { EspeciesController } from './controllers/especies.controller';
import { RiegosController } from './controllers/riegos.controller';
import { UsuariosController } from './controllers/usuarios.controller';

import { PlantasService } from './services/plantas.service';
import { EspeciesService } from './services/especies.service';
import { RiegosService } from './services/riegos.service';
import { UsuariosService } from './services/usuarios.service';

import { UsuarioRepository } from './repositories/usuario.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_DATABASE || 'database.sqlite',
      entities: [Especie, Planta, RegistroRiego, Usuario],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Especie,
      Planta,
      RegistroRiego,
      Usuario,
    ]),
  ],
  controllers: [
    PlantasController,
    EspeciesController,
    RiegosController,
    UsuariosController,
  ],
  providers: [
    PlantasService,
    EspeciesService,
    RiegosService,
    UsuariosService,
    UsuarioRepository,
  ],
})
export class AppModule {}