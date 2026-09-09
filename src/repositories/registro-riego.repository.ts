import { Injectable } from '@nestjs/common';
import { RegistroRiego } from '../domain/registro-riego.entity';

@Injectable()
export class RegistroRiegoRepository {
  private readonly registros: RegistroRiego[] = [];

  findAll(): RegistroRiego[] {
    return this.registros;
  }

  save(registro: RegistroRiego): void {
    this.registros.push(registro);
  }
}