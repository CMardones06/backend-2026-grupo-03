import { Injectable } from '@nestjs/common';
import { Especie } from '../domain/especie.entity';

@Injectable()
export class EspecieRepository {
  private readonly especies: Especie[] = [];

  findAll(): Especie[] {
    return this.especies;
  }

  save(especie: Especie): void {
    this.especies.push(especie);
  }
}