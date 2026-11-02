import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Especie } from './domain/entities/especie.entity';
import { Planta } from './domain/entities/planta.entity';
import { RegistroRiego } from './domain/entities/registro-riego.entity';
import { Usuario } from './domain/entities/usuario.entity';

import { EspeciesController } from './controllers/especies.controller';
import { EspeciesService } from './services/especies.service';
import { PlantasController } from './controllers/plantas.controller';
import { PlantasService } from './services/plantas.service';
import { RiegosController } from './controllers/riegos.controller';
import { RiegosService } from './services/riegos.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { UsuarioRepository } from './repositories/usuario.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [Especie, Planta, RegistroRiego, Usuario],
      synchronize: true,
    }as any),

    TypeOrmModule.forFeature([Especie, Planta, RegistroRiego, Usuario]),
  ],
  controllers: [
    EspeciesController,
    PlantasController,
    RiegosController,
    UsuariosController,
  ],
  providers: [
    EspeciesService,
    PlantasService,
    RiegosService,
    UsuariosService,
    UsuarioRepository,
  ],
})
export class AppModule {}