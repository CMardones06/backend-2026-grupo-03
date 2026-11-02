import { IsNotEmpty, IsString, IsInt, MaxLength, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { EstadoSalud } from '../domain/entities/planta.entity';
export class CrearPlantaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apodo: string;

  @IsDateString({}, {
    message: 'La fecha de adquisición debe ser una fecha válida en formato ISO',
  })
  @IsNotEmpty()
  fecha_adquisicion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ubicacion: string;

  @IsOptional()
  @IsEnum(EstadoSalud, {
    message: 'El estado de salud debe ser: Saludable, Regular, Critico o Muerto',
  })
  estado_salud?: EstadoSalud;

  @IsInt()
  @IsNotEmpty()
  especie_id: number;

  @IsInt()
  @IsNotEmpty()
  usuario_id: number;
}