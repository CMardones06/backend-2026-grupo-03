import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, MaxLength } from 'class-validator';

export class CrearEspecieDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_comun: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_cientifico: string;

  @IsInt()
  @Min(1)
  frecuencia_riego_dias: number;

  @IsString()
  @IsNotEmpty()
  tipo_luz: string;
}