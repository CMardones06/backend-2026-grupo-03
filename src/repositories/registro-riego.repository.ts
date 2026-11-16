import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroRiego } from '../schemas/entities/registro-riego.entity';

@Injectable()
export class RegistroRiegoRepository {
  constructor(
    @InjectRepository(RegistroRiego)
    private readonly ormRepo: Repository<RegistroRiego>,
  ) {}

  create(datos: Partial<RegistroRiego>): Promise<RegistroRiego> {
    const nuevo = this.ormRepo.create(datos);
    return this.ormRepo.save(nuevo);
  }

  findAndCountPaginated(
    skip: number,
    take: number,
  ): Promise<[RegistroRiego[], number]> {
    return this.ormRepo.findAndCount({
      take,
      skip,
      relations: { planta: true },
    });
  }

  findByIdWithRelations(id: number): Promise<RegistroRiego | null> {
    return this.ormRepo.findOne({
      where: { id },
      relations: { planta: true },
    });
  }

  update(
    registro: RegistroRiego,
    cambios: Partial<RegistroRiego>,
  ): Promise<RegistroRiego> {
    this.ormRepo.merge(registro, cambios);
    return this.ormRepo.save(registro);
  }

  async remove(registro: RegistroRiego): Promise<void> {
    await this.ormRepo.remove(registro);
  }
}