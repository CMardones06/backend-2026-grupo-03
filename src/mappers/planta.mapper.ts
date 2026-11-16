import { Planta } from '../schemas/entities/planta.entity';

export class PlantaMapper {
  static toResponse(planta: Planta) {
    return {
      id: planta.id,
      apodo: planta.apodo,
      ubicacion: planta.ubicacion,
      estado_salud: planta.estado_salud,
      fecha_adquisicion: planta.fecha_adquisicion ?? null,
      especie_id: planta.especie_id ?? planta.especie?.id ?? null,
      usuario_id: planta.usuario_id ?? planta.usuario?.id ?? null,
      especie: planta.especie ?? null,
      usuario: planta.usuario ?? null,
      ...(planta.riegos !== undefined ? { riegos: planta.riegos } : {}),
    };
  }
}