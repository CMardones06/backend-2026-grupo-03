import { RegistroRiego } from '../schemas/entities/registro-riego.entity';

export class RegistroRiegoMapper {
  static toResponse(riego: RegistroRiego) {
    return {
      id: riego.id,
      planta_id: riego.planta_id,
      fecha_riego:
        riego.fecha_riego instanceof Date
          ? riego.fecha_riego.toISOString()
          : String(riego.fecha_riego),
      cantidad_ml: riego.cantidad_ml,
      observaciones: riego.observaciones ?? null,
      planta: riego.planta ?? null,
    };
  }
}