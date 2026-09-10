import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CrearPlantaDto {
  @IsNotEmpty()
  @IsString()
  apodo: string;

  @IsNotEmpty()
  @IsNumber()
  especie_id: number;

  @IsNotEmpty()
  @IsString()
  estado_salud: string;
}