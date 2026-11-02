import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MaxLength,
  IsDateString,
  IsPositive,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';

export class CrearRiegoDto {
  @ApiProperty({
    description: 'ID de una planta existente que no esté muerta',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  planta_id: number;

  @ApiProperty({
    description: 'Fecha y hora del riego. No puede ser futura',
    example: '2026-11-01T12:00:00Z',
    format: 'date-time',
  })
  @IsDateString({}, {
    message: 'La fecha de riego debe ser una fecha válida',
  })
  @IsNotEmpty()
  fecha_riego: string;

  @ApiProperty({
    description: 'Cantidad de agua en mililitros; debe ser un entero positivo',
    example: 250,
    minimum: 1,
  })
  @IsInt()
  @IsPositive({
    message: 'La cantidad en ml debe ser mayor a 0',
  })
  @IsNotEmpty()
  @Min(1)
  cantidad_ml: number;

  @ApiPropertyOptional({
    description: 'Observaciones del riego',
    example: 'Riego de mantenimiento',
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

  @ApiProperty({
    description: 'Fecha y hora del riego',
    example: '2026-11-01T12:00:00.000Z',
    format: 'date-time',
  })
  fecha_riego: string;

  @ApiProperty({ example: 250 })
  cantidad_ml: number;

  @ApiProperty({
    example: 'Riego de mantenimiento',
    nullable: true,
    required: false,
  })
  observaciones?: string | null;

  @ApiProperty({
    description: 'Planta asociada al riego',
    type: 'object',
    additionalProperties: true,
    example: {
      id: 1,
      nombre: 'Monstera de la Sala',
      ubicacion: 'Living',
      estado_salud: 'Excelente',
      fecha_ingreso: null,
      especie_id: 1,
      apodo: 'Mi monstera',
      fecha_adquisicion: '2026-11-01',
      usuario_id: 1,
    },
  })
  planta: Record<string, unknown>;
}

export class RiegosPaginadosRespuestaDto {
  @ApiProperty({ type: [RiegoRespuestaDto] })
  data: RiegoRespuestaDto[];

  @ApiProperty({
    description: 'Cantidad total de registros de riego',
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