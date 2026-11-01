import { IsString, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';

export enum EstadoSalud {
  OPTIMO = 'Optimo',
  REGULAR = 'Regular',
  CRITICO = 'Critico',
  MUERTO = 'Muerto',
}

export class CreatePlantaDto {
  @IsString()
  @IsNotEmpty()
  apodo: string;

  @IsDateString()
  fecha_adquisicion: Date;

  @IsEnum(EstadoSalud, { message: 'El estado de salud no es válido' })
  estado_salud: EstadoSalud;

  @IsString()
  especie_id: string;
}