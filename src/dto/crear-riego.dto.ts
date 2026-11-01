import { IsNotEmpty, IsInt, IsOptional, IsString, Min, MaxLength, IsDateString } from 'class-validator';

export class CrearRiegoDto {
  @IsInt()
  @IsNotEmpty()
  planta_id: number;

  @IsInt()
  @Min(1)
  cantidad_ml: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de riego debe ser una fecha válida' })
  fecha_riego?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Las observaciones no pueden superar los 100 caracteres' })
  observaciones?: string;
}