import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especie } from '../domain/entities/especie.entity';

@Injectable()
export class EspecieRepository {
  constructor(
    @InjectRepository(Especie)
    private readonly especieOrmRepository: Repository<Especie>,
  ) {}

  async findAll(): Promise<Especie[]> {
    return await this.especieOrmRepository.find();
  }

  async findById(id: number): Promise<Especie | null> {
    return await this.especieOrmRepository.findOne({ where: { id } });
  }

  async save(especie: Especie): Promise<Especie> {
    return await this.especieOrmRepository.save(especie);
  }
}