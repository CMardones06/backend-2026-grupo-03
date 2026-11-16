import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsuarioRespuestaDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Maria Paz',
  })
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'maria@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Rol del usuario dentro del sistema',
    example: 'admin',
  })
  rol: string;

  @ApiProperty({
    description: 'Indica si el usuario se encuentra activo',
    example: true,
  })
  activo: boolean;
}

export class UsuarioDetalleRespuestaDto extends UsuarioRespuestaDto {
  @ApiPropertyOptional({
    description: 'Plantas asociadas al usuario',
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: true,
    },
    example: [],
  })
  plantas: Record<string, unknown>[];
}

export class UsuariosPaginadosRespuestaDto {
  @ApiProperty({ type: [UsuarioRespuestaDto] })
  data: UsuarioRespuestaDto[];

  @ApiProperty({
    description: 'Cantidad total de usuarios',
    example: 2,
  })
  total: number;

  @ApiProperty({
    description: 'Página solicitada',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Última página disponible',
    example: 1,
  })
  lastPage: number;
}