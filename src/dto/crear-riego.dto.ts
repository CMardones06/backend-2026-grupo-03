import {
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
  Min,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';

export class CrearRiegoDto {
  @ApiProperty({
    description: 'Identificador de la planta que fue regada',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  planta_id: number;

  @ApiProperty({
    description: 'Cantidad de agua aplicada en mililitros (ml)',
    example: 500,
    minimum: 1,
  })
  @IsInt()
  @IsPositive({ message: 'La cantidad en ml debe ser un número positivo' })
  @IsNotEmpty()
  cantidad_ml: number;

  @ApiPropertyOptional({
    description: 'Fecha y hora del riego en formato ISO 8601',
    example: '2026-11-02T09:00:00Z',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de riego debe tener un formato ISO válido' },
  )
  fecha_riego?: string;

  @ApiPropertyOptional({
    description: 'Notas u observaciones adicionales sobre el riego',
    example: 'Riego matutino completo',
    maxLength: 100,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Las observaciones no pueden superar los 100 caracteres',
  })
  observaciones?: string;
}

export class ActualizarRiegoDto extends PartialType(CrearRiegoDto) {}

export class RiegoRespuestaDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  planta_id: number;

  @ApiProperty({ example: '2026-11-02T09:00:00.000Z' })
  fecha_riego: Date | string;

  @ApiProperty({ example: 500 })
  cantidad_ml: number;

  @ApiPropertyOptional({
    example: 'Riego matutino completo',
    nullable: true,
  })
  observaciones?: string | null;

  @ApiPropertyOptional({
    description: 'Datos de la planta asociada al riego',
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: {
      id: 1,
      apodo: 'Monstera de la Sala',
      ubicacion: 'Living',
      estado_salud: 'Excelente',
    },
  })
  planta?: Record<string, unknown> | null;
}

export class RiegosPaginadosRespuestaDto {
  @ApiProperty({ type: [RiegoRespuestaDto] })
  data: RiegoRespuestaDto[];

  @ApiProperty({ example: 2 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 1 })
  lastPage: number;
}