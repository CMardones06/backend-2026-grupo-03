import { IsNotEmpty, IsString, IsInt, Min, MaxLength, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Luz_Requerida } from '../domain/entities/especie.entity';
export class CrearEspecieDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nombre_comun: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_cientifico: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  origen: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  frec_riego: number;

  @IsEnum(Luz_Requerida, {
    message: 'El requerimiento de luz debe ser: Directa, Indirecta, Sombra o Poca luz',
  })
  requerimiento_luz: Luz_Requerida;
}