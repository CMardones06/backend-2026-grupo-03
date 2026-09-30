import { Module } from '@nestjs/common';
import { PlantasController } from './controllers/plantas.controller';
import { EspeciesController } from './controllers/especies.controller';
import { RiegosController } from './controllers/riegos.controller';

import { PlantasService } from './services/plantas.service';
import { EspeciesService } from './services/especies.service';
import { RiegosService } from './services/riegos.service';

import { PlantaRepository } from './repositories/planta.repository';
import { EspecieRepository } from './repositories/especie.repository';
import { RegistroRiegoRepository } from './repositories/registro-riego.repository';

@Module({
  imports: [],
  controllers: [PlantasController, EspeciesController, RiegosController],
  providers: [
    PlantasService,
    EspeciesService,
    RiegosService,
    PlantaRepository,
    EspecieRepository,
    RegistroRiegoRepository,
  ],
})
export class AppModule {}