import { Injectable } from '@nestjs/common';
import { Planta } from '../domain/planta.entity';

@Injectable()
export class PlantaRepository {
  private readonly plantas: Planta[] = [];

  findAll(): Planta[] {
    return this.plantas;
  }

  save(planta: Planta): void {
    this.plantas.push(planta);
  }
}