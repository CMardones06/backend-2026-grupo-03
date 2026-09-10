import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantasController } from './controllers/plantas.controller';
import { PlantasService } from './services/plantas.service';
import { RiegosService } from './services/riegos.service';

@Module({
  imports: [],
  controllers: [AppController, PlantasController],
  providers: [AppService, PlantasService, RiegosService],
})
export class AppModule {}