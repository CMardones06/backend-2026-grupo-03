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
  PartialType,
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

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'camila@example.com',
  })
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

  @ApiPropertyOptional({
    description: 'Estado activo del usuario',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {}