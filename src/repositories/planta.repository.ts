import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from '../domain/entities/planta.entity';

@Injectable()
export class PlantaRepository {
  constructor(
    @InjectRepository(Planta)
    private readonly plantaOrmRepository: Repository<Planta>,
  ) {}

  async findAll(): Promise<Planta[]> {
    return await this.plantaOrmRepository.find();
  }

  async findById(id: number): Promise<Planta | null> {
    return await this.plantaOrmRepository.findOne({ where: { id } });
  }

  async save(planta: Planta): Promise<Planta> {
    return await this.plantaOrmRepository.save(planta);
  }
}