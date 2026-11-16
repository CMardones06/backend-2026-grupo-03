import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';
import {
  UsuarioRespuestaDto,
  UsuarioDetalleRespuestaDto,
  UsuariosPaginadosRespuestaDto,
} from './usuario-respuesta.dto';

export class CrearUsuarioDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Maria Paz',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'maria@example.com',
    maxLength: 150,
  })
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @ApiProperty({
    description: 'Rol del usuario dentro del sistema',
    example: 'admin',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  rol: string;

  @ApiPropertyOptional({
    description: 'Indica si la cuenta del usuario está activa',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {}

export {
  UsuarioRespuestaDto,
  UsuarioDetalleRespuestaDto,
  UsuariosPaginadosRespuestaDto,
};