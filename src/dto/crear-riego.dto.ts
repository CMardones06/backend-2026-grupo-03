import { IsNotEmpty, IsInt, IsOptional, IsString, Min, MaxLength, IsDateString, IsPositive } from 'class-validator';

export class CrearRiegoDto {
  @IsDateString()
  @IsNotEmpty()
  fecha_riego: string;
  
  @IsInt()
  @IsPositive({ message: 'La cantidad en ml debe ser mayor a 0' })
  @IsNotEmpty()
  @Min(1)
  cantidad_ml: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  observaciones: string;

  @IsInt()
  planta_id: number;
}