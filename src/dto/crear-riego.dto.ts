import { IsNotEmpty, IsInt, IsOptional, IsString, Min, MaxLength, IsDateString } from 'class-validator';

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
  @IsDateString({}, { message: 'La fecha de riego debe ser una fecha válida' })
  fecha_riego?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Las observaciones no pueden superar los 100 caracteres' })
  observaciones?: string;
}