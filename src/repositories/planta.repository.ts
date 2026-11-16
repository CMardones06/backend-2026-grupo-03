import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from '../schemas/entities/planta.entity';

@Injectable()
export class PlantaRepository {
  constructor(
    @InjectRepository(Planta)
    private readonly ormRepo: Repository<Planta>,
  ) {}

  create(datos: Partial<Planta>): Promise<Planta> {
    const nueva = this.ormRepo.create(datos);
    return this.ormRepo.save(nueva);
  }

  findAndCountPaginated(skip: number, take: number): Promise<[Planta[], number]> {
    return this.ormRepo.findAndCount({
      take,
      skip,
      relations: {
        especie: true,
        usuario: true,
        riegos: true,
      },
    });
  }

  findByIdWithRelations(id: number): Promise<Planta | null> {
    return this.ormRepo.findOne({
      where: { id },
      relations: {
        especie: true,
        usuario: true,
        riegos: true,
      },
    });
  }

  findById(id: number): Promise<Planta | null> {
    return this.ormRepo.findOneBy({ id });
  }

  save(planta: Planta): Promise<Planta> {
    return this.ormRepo.save(planta);
  }

  async remove(planta: Planta): Promise<void> {
    await this.ormRepo.remove(planta);
  }
}