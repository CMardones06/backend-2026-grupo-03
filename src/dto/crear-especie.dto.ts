import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CrearEspecieDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
}