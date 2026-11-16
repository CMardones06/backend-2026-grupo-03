import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especie } from '../schemas/entities/especie.entity';

@Injectable()
export class EspecieRepository {
  constructor(
    @InjectRepository(Especie)
    private readonly ormRepo: Repository<Especie>,
  ) {}

  create(datos: Partial<Especie>): Promise<Especie> {
    const nueva = this.ormRepo.create(datos);
    return this.ormRepo.save(nueva);
  }

  findAndCountPaginated(skip: number, take: number): Promise<[Especie[], number]> {
    return this.ormRepo.findAndCount({
      take,
      skip,
      relations: { plantas: true },
    });
  }

  findByIdWithRelations(id: number): Promise<Especie | null> {
    return this.ormRepo.findOne({
      where: { id },
      relations: { plantas: true },
    });
  }

  findById(id: number): Promise<Especie | null> {
    return this.ormRepo.findOneBy({ id });
  }

  update(especie: Especie, cambios: Partial<Especie>): Promise<Especie> {
    this.ormRepo.merge(especie, cambios);
    return this.ormRepo.save(especie);
  }

  async remove(especie: Especie): Promise<void> {
    await this.ormRepo.remove(especie);
  }
}