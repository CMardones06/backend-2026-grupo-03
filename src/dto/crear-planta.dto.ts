import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';

export enum EstadoSalud {
  OPTIMO = 'Optimo',
  REGULAR = 'Regular',
  CRITICO = 'Critico',
  MUERTA = 'Muerta', // Hallazgo #10: Unificado a 'Muerta'
}

export class CrearPlantaDto {
  @IsNotEmpty()
  @IsString()
  apodo: string;

  @IsNotEmpty()
  @IsNumber()
  especie_id: number;

  @IsNotEmpty()
  @IsEnum(EstadoSalud, { message: 'El estado de salud no es válido' })
  estado_salud: EstadoSalud;
}