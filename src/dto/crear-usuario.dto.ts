import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  rol: string;
}