import { ApiProperty } from '@nestjs/swagger';

export class UsuarioRespuestaDto {
  @ApiProperty({
    description: 'Identificador generado por la base de datos',
    example: 8,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Camila Mardones',
  })
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'camila@example.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 'user',
    enum: ['admin', 'user'],
  })
  rol: string;

  @ApiProperty({
    description: 'Indica si el usuario está activo',
    example: true,
  })
  activo: boolean;
}

export class UsuariosPaginadosRespuestaDto {
  @ApiProperty({
    description: 'Usuarios de la página solicitada',
    type: [UsuarioRespuestaDto],
  })
  items: UsuarioRespuestaDto[];

  @ApiProperty({
    description: 'Cantidad total de usuarios que cumplen el filtro',
    example: 2,
  })
  total: number;

  @ApiProperty({
    description: 'Página solicitada',
    example: 1,
  })
  pagina: number;

  @ApiProperty({
    description: 'Cantidad máxima de usuarios por página',
    example: 1,
  })
  limite: number;

  @ApiProperty({
    description:
      'Total de páginas del conjunto filtrado; cero si no hay coincidencias',
    example: 2,
  })
  total_paginas: number;
}