import { Especie } from '../schemas/entities/especie.entity';

export class EspecieMapper {
  static toResponse(especie: Especie) {
    return {
      id: especie.id,
      nombre_comun: especie.nombre_comun,
      nombre_cientifico: especie.nombre_cientifico,
      origen: especie.origen,
      descripcion: especie.descripcion ?? null,
    };
  }

  static toDetailResponse(especie: Especie) {
    return {
      ...this.toResponse(especie),
      plantas: especie.plantas ?? [],
    };
  }
}