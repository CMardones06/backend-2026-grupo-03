import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CrearUsuarioDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(2, 100)
  nombre: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @IsIn(['admin', 'user'], {
    message: 'El rol debe ser admin o user',
  })
  rol: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}