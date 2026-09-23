import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CrearRiegoDto {
  @IsNotEmpty()
  @IsNumber()
  planta_id: number;

  @IsNotEmpty()
  @IsString()
  fecha_riego: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad_ml: number;
}