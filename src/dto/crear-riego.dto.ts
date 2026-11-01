import { IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CrearRiegoDto {
  @IsNotEmpty()
  @IsNumber()
  planta_id: number;

  @IsNotEmpty()
  @IsDateString() // Hallazgo #11: Valida formato de fecha ISO
  fecha_riego: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive() // Hallazgo #11: Solo números positivos
  cantidad_ml: number;
}