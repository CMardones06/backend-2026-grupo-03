import { Module } from '@nestjs/common';
import { PlantasController } from './controllers/plantas.controller';
import { EspeciesController } from './controllers/especies.controller';
import { RiegosController } from './controllers/riegos.controller';

import { PlantasService } from './services/plantas.service';
import { EspeciesService } from './services/especies.service';
import { RiegosService } from './services/riegos.service';

@Module({
  imports: [],
  controllers: [PlantasController, EspeciesController, RiegosController],
  providers: [PlantasService, EspeciesService, RiegosService],
})
export class AppModule {}