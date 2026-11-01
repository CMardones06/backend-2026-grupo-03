import { IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearRiegoDto {
  @ApiProperty({
    description: 'ID del riego',
    example: '1'
  })
  @IsNotEmpty()
  @IsNumber()
  planta_id: number;

  @ApiProperty({
    description:'Fecha del riego',
    example:'03/09/2026'
  })
  @IsNotEmpty()
  @IsDateString()
  fecha_riego: string;

  @ApiProperty({
    description:'Cantidad de agua en ml',
    example: '10'
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cantidad_ml: number;
}