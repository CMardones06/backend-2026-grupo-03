import { IsString, MinLength, IsNumber } from 'class-validator';

export class CreateEspecieDto {
  //Validación de Longitud: Mínimo 3 caracteres
  @IsString()
  @MinLength(3, { message: 'El nombre común debe tener al menos 3 caracteres' })
  nombre_comun: string;

  @IsString()
  nombre_cientifico: string;

  @IsNumber()
  dias_entre_riegos: number;

  @IsString()
  requerimiento_luz: string;
}