// src/dto/consultar-usuarios.dto.ts
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  Min,
  IsIn,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ConsultarUsuariosDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nombre o correo electrónico',
    example: 'Maria',
  })
  @IsOptional()
  @IsString()
  busqueda?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por rol del usuario',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  @IsIn(['admin', 'user'], { message: 'El rol debe ser admin o user' })
  rol?: 'admin' | 'user';

  @ApiPropertyOptional({
    description: 'Filtrar por estado activo (true o false)',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean()
  activo?: boolean;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    enum: ['id', 'nombre', 'email', 'rol'],
    default: 'id',
    example: 'id',
  })
  @IsOptional()
  @IsIn(['id', 'nombre', 'email', 'rol'])
  ordenar_por: 'id' | 'nombre' | 'email' | 'rol' = 'id';

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento (ASC o DESC)',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
    example: 'ASC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  direccion: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({
    description: 'Número de página a consultar',
    default: 1,
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pagina: number = 1;

  @ApiPropertyOptional({
    description: 'Cantidad de registros por página',
    default: 10,
    minimum: 1,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limite: number = 10;
}