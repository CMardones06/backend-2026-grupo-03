import { 
  IsNotEmpty, 
  IsString, 
  MaxLength, 
  MinLength, 
  IsOptional 
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';

export class CrearEspecieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nombre_comun: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_cientifico: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  origen: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

}

export class ActualizarEspecieDto extends PartialType(CrearEspecieDto) {}