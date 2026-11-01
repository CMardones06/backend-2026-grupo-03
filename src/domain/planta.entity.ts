export class Planta {
  id: string;
  apodo: string;
  fecha_adquisicion: Date;
  estado_salud: string;
  especie_id: string; // Relación 1:N con Especie
}