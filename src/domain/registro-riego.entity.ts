export class RegistroRiego {
  id: string;
  fecha_riego: Date;
  cantidad_ml: number;
  tipo_fertilizante: string;
  planta_id: string; // Relación 1:N con Planta
}