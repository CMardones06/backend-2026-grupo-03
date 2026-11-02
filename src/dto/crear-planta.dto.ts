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