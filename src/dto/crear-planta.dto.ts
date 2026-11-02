import {
  IsNotEmpty,
  IsString,
  IsInt,
  MaxLength,
  IsDateString,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EstadoSalud } from '../domain/entities/planta.entity';

export class CrearPlantaDto {
  @ApiProperty({ example: 'Helecho de interior' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Mi helecho' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apodo: string;

  @ApiProperty({ example: '2026-11-01', format: 'date' })
  @IsDateString({}, {
    message: 'La fecha de adquisición debe ser una fecha válida en formato ISO',
  })
  @IsNotEmpty()
  fecha_adquisicion: string;

  @ApiProperty({ example: 'Sala' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ubicacion: string;

  @ApiProperty({
    enum: EstadoSalud,
    required: false,
    default: EstadoSalud.SALUDABLE,
  })
  @IsOptional()
  @IsEnum(EstadoSalud, {
    message: 'El estado debe ser Excelente, Saludable, Enferma, Crítica o Muerta',
  })
  estado_salud?: EstadoSalud;

  @ApiProperty({ example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  especie_id: number;

  @ApiProperty({ example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  usuario_id: number;
}

export class ActualizarPlantaDto extends PartialType(CrearPlantaDto) {}

export class PlantaRespuestaDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Helecho de interior' })
  nombre: string;

  @ApiProperty({ example: 'Mi helecho', nullable: true })
  apodo: string | null;

  @ApiProperty({ example: 'Sala' })
  ubicacion: string;

  @ApiProperty({
    example: 'Saludable',
    description: 'Estado de salud de la planta',
  })
  estado_salud: string;

  @ApiProperty({
    example: '2026-11-01',
    format: 'date',
    nullable: true,
    required: false,
  })
  fecha_ingreso?: string | null;

  @ApiProperty({
    example: '2026-11-01',
    format: 'date',
    nullable: true,
  })
  fecha_adquisicion: string | null;

  @ApiProperty({ example: 1, nullable: true })
  especie_id: number | null;

  @ApiProperty({ example: 1, nullable: true })
  usuario_id: number | null;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    nullable: true,
    description: 'Especie asociada',
    example: {
      id: 1,
      nombre_comun: 'Monstera',
      nombre_cientifico: 'Monstera deliciosa',
      origen: 'América tropical',
      descripcion: 'Planta de hojas grandes',
    },
  })
  especie: Record<string, unknown> | null;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    nullable: true,
    description: 'Usuario asociado',
    example: {
      id: 1,
      nombre: 'Maria Paz',
      email: 'maria@example.com',
      rol: 'admin',
      activo: true,
    },
  })
  usuario: Record<string, unknown> | null;

  @ApiProperty({
    description: 'Registros de riego; se incluyen al consultar la planta',
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: true,
    },
    required: false,
    example: [],
  })
  riegos?: Record<string, unknown>[];
}

export class PlantasPaginadasRespuestaDto {
  @ApiProperty({ type: [PlantaRespuestaDto] })
  data: PlantaRespuestaDto[];

  @ApiProperty({
    description: 'Cantidad total de plantas',
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