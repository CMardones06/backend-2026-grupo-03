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
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CrearUsuarioDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Camila Mardones',
    minLength: 2,
    maxLength: 100,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(2, 100)
  nombre: string;
<<<<<<< HEAD

  @ApiProperty({
    description: 'Correo único del usuario; se guarda en minúsculas',
    example: 'camila@example.com',
    format: 'email',
    maxLength: 150,
  })
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.trim().toLowerCase()
      : value,
  )
=======
 
>>>>>>> 8ee9d3bd6e98ef713f45a373de1ead804e9cc8e7
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 'user',
    enum: ['admin', 'user'],
  })
  @IsString()
  @IsIn(['admin', 'user'], {
    message: 'El rol debe ser admin o user',
  })
  rol: string;

<<<<<<< HEAD
  @ApiPropertyOptional({
    description:
      'Al crear se utiliza true si se omite; al actualizar se conserva el valor existente',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
=======
>>>>>>> 8ee9d3bd6e98ef713f45a373de1ead804e9cc8e7
}