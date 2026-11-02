import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroRiego } from '../domain/entities/registro-riego.entity';

@Injectable()
export class RegistroRiegoRepository {
  constructor(
    @InjectRepository(RegistroRiego)
    private readonly repository: Repository<RegistroRiego>,
  ) {}

  async findAll(): Promise<RegistroRiego[]> {
    return await this.repository.find({
      relations: {
        planta: true,
      },
    });
  }

  async findById(id: number): Promise<RegistroRiego | null> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        planta: true,
      },
    });
  }

  async save(registro: RegistroRiego): Promise<RegistroRiego> {
    return await this.repository.save(registro);
  }

  async create(datos: Partial<RegistroRiego>): Promise<RegistroRiego> {
    const nuevoRegistro = this.repository.create(datos);
    return await this.repository.save(nuevoRegistro);
  }
}