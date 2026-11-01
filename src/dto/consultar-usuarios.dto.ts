import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ConsultarUsuariosDto {
  @ApiPropertyOptional({
    description: 'Filtrar por rol',
    enum: ['admin', 'user'],
  })
  @IsOptional()
  @IsIn(['admin', 'user'])
  rol?: 'admin' | 'user';

  @ApiPropertyOptional({
    description: 'Campo utilizado para ordenar',
    enum: ['id', 'nombre', 'email', 'rol'],
    default: 'id',
  })
  @IsIn(['id', 'nombre', 'email', 'rol'])
  ordenar_por: 'id' | 'nombre' | 'email' | 'rol' = 'id';

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    enum: ['asc', 'desc'],
    default: 'asc',
  })
  @IsIn(['asc', 'desc'])
  direccion: 'asc' | 'desc' = 'asc';

  @ApiPropertyOptional({
    description: 'Página solicitada',
    default: 1,
    minimum: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pagina: number = 1;

  @ApiPropertyOptional({
    description: 'Cantidad máxima de usuarios por página',
    default: 10,
    minimum: 1,
    maximum: 100,
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limite: number = 10;
}