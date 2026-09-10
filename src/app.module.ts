import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantasController } from './controllers/plantas.controller';
import { EspeciesController } from './controllers/especies.controller';
import { RiegosController } from './controllers/riegos.controller';
import { PlantasService } from './services/plantas.service';
import { RiegosService } from './services/riegos.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    PlantasController,
    EspeciesController,
    RiegosController,
  ],
  providers: [AppService, PlantasService, RiegosService],
})
export class AppModule {}