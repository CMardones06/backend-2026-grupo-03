import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearEspecieDto {
  @ApiProperty({
    description: 'Nombre de la especie',
    example: 'Luma apiculata (Arrayán)'
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  nombre: string;

  @ApiProperty({
    description: 'Descripción de la especie',
    example:'arbolito perennifolio originario de los bosques templados de Chile y Argentina que alcanza una altura de 3-5 metros (rara vez 20m).'
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;
}