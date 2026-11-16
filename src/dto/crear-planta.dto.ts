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
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';
import { EstadoSalud } from '../schemas/entities/planta.entity';

export class CrearPlantaDto {
  @ApiProperty({
    description: 'Apodo o nombre personalizado asignado a la planta',
    example: 'Monstera de la Sala',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apodo: string;

  @ApiProperty({
    description: 'Fecha en la que se adquirió la planta (formato YYYY-MM-DD)',
    example: '2026-11-01',
    format: 'date',
  })
  @IsDateString(
    {},
    {
      message:
        'La fecha de adquisición debe ser una fecha válida en formato ISO',
    },
  )
  @IsNotEmpty()
  fecha_adquisicion: string;

  @ApiProperty({
    description: 'Lugar físico donde se encuentra la planta',
    example: 'Living',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ubicacion: string;

  @ApiPropertyOptional({
    description: 'Estado de salud actual de la planta',
    enum: EstadoSalud,
    default: EstadoSalud.SALUDABLE,
    example: EstadoSalud.SALUDABLE,
  })
  @IsOptional()
  @IsEnum(EstadoSalud, {
    message:
      'El estado debe ser Excelente, Saludable, Enferma, Crítica o Muerta',
  })
  estado_salud?: EstadoSalud;

  @ApiProperty({
    description: 'ID de la especie a la que pertenece la planta',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  especie_id: number;

  @ApiProperty({
    description: 'ID del usuario dueño de la planta',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  usuario_id: number;
}

export class ActualizarPlantaDto extends PartialType(CrearPlantaDto) {}

export class PlantaRespuestaDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Monstera de la Sala' })
  apodo: string;

  @ApiProperty({ example: 'Living' })
  ubicacion: string;

  @ApiProperty({ enum: EstadoSalud, example: EstadoSalud.SALUDABLE })
  estado_salud: string;

  @ApiPropertyOptional({ example: '2026-11-01', nullable: true })
  fecha_ingreso?: string | null;

  @ApiPropertyOptional({ example: '2026-11-01', nullable: true })
  fecha_adquisicion?: string | null;

  @ApiPropertyOptional({ example: 1, nullable: true })
  especie_id?: number | null;

  @ApiPropertyOptional({ example: 1, nullable: true })
  usuario_id?: number | null;

  @ApiPropertyOptional({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: {
      id: 1,
      nombre_comun: 'Monstera',
      nombre_cientifico: 'Monstera deliciosa',
      origen: 'América Tropical',
      descripcion: 'Planta de hojas grandes y caladas',
    },
  })
  especie?: Record<string, unknown> | null;

  @ApiPropertyOptional({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: {
      id: 1,
      nombre: 'Maria Paz',
      email: 'maria@example.com',
      rol: 'admin',
      activo: true,
    },
  })
  usuario?: Record<string, unknown> | null;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'object', additionalProperties: true },
    example: [],
  })
  riegos?: Record<string, unknown>[];
}

export class PlantasPaginadasRespuestaDto {
  @ApiProperty({ type: [PlantaRespuestaDto] })
  data: PlantaRespuestaDto[];

  @ApiProperty({ example: 2 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 1 })
  lastPage: number;
}