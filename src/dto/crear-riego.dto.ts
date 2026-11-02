import { 
  IsNotEmpty, 
  IsInt, 
  IsOptional, 
  IsString, 
  Min, 
  MaxLength, 
  IsDateString, 
  IsPositive 
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';

export class CrearRiegoDto {
  @ApiProperty({ description: 'ID de la planta a la que se le aplica el riego' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  planta_id: number;

  @ApiProperty()
  @IsDateString({}, { message: 'La fecha de riego debe ser una fecha válida' })
  @IsNotEmpty()
  fecha_riego: string;

  @ApiProperty()
  @IsInt()
  @IsPositive({ message: 'La cantidad en ml debe ser mayor a 0' })
  @IsNotEmpty()
  @Min(1)
  cantidad_ml: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Las observaciones no pueden superar los 100 caracteres' })
  observaciones?: string;
}

export class ActualizarRiegoDto extends PartialType(CrearRiegoDto) {}