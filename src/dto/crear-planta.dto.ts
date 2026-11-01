import { IsNotEmpty, IsString, IsInt, MaxLength } from 'class-validator';

export class CrearPlantaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsInt()
  @IsNotEmpty()
  especie_id: number;

  @IsInt()
  @IsNotEmpty()
  usuario_id: number;
}