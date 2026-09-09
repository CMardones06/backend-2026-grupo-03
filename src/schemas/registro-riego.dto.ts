import { IsNumber, IsPositive, IsString, MaxDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRegistroRiegoDto {
  //Validación de regla: Fecha de riego no mayor a la actual
  @Type(() => Date)
  @MaxDate(new Date(), { message: 'La fecha de riego no puede ser futura' })
  fecha_riego: Date;

  //Validación Numérica: Mayor que 0
  @IsNumber()
  @IsPositive({ message: 'La cantidad ml debe ser mayor que 0' })
  cantidad_ml: number;

  @IsString()
  tipo_fertilizante: string;

  @IsString()
  planta_id: string;
}