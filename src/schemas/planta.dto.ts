import { IsString, IsEnum, IsDateString } from 'class-validator';

export enum EstadoSalud {
  OPTIMO = 'Optimo',
  REGULAR = 'Regular',
  CRITICO = 'Critico',
  MUERTO = 'Muerto',
}

export class CreatePlantaDto {
  @IsString()
  apodo: string;

  @IsDateString()
  fecha_adquisicion: Date;

  //Validación por valores permitidos Enum
  @IsEnum(EstadoSalud, { message: 'El estado de salud no es válido' })
  estado_salud: EstadoSalud;

  @IsString()
  especie_id: string;
}