import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';

export class CrearEspecieDto {
  @ApiProperty({
    description: 'Nombre común de la especie',
    example: 'Monstera',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nombre_comun: string;

  @ApiProperty({
    description: 'Nombre científico de la especie',
    example: 'Monstera deliciosa',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_cientifico: string;

  @ApiProperty({
    description: 'Lugar de origen',
    example: 'América tropical',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  origen: string;

  @ApiPropertyOptional({
    description: 'Descripción de la especie',
    example: 'Planta de hojas grandes y caladas',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class ActualizarEspecieDto extends PartialType(CrearEspecieDto) {}

export class EspecieRespuestaDto extends CrearEspecieDto {
  @ApiProperty({
    description: 'Identificador generado por la base de datos',
    example: 1,
  })
  id: number;
}

export class EspecieDetalleRespuestaDto extends EspecieRespuestaDto {
  @ApiProperty({
    description: 'Plantas asociadas a esta especie',
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: true,
    },
    example: [],
  })
  plantas: Record<string, unknown>[];
}

export class EspeciesPaginadasRespuestaDto {
  @ApiProperty({ type: [EspecieDetalleRespuestaDto] })
  data: EspecieDetalleRespuestaDto[];

  @ApiProperty({
    description: 'Cantidad total de especies',
    example: 2,
  })
  total: number;

  @ApiProperty({
    description: 'Página solicitada',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Última página; el servicio devuelve 1 si no hay registros',
    example: 1,
  })
  lastPage: number;
}