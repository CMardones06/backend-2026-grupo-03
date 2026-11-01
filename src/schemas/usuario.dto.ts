import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail({}, { message: 'El correo debe tener un formato válido' })
  correo: string;

  @IsString()
  nivel_experiencia: string;
}