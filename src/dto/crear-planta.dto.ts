import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EstadoSalud {
  OPTIMO = 'Optimo',
  REGULAR = 'Regular',
  CRITICO = 'Critico',
  MUERTA = 'Muerta',
}

export class CrearPlantaDto {
  @ApiProperty ({
    description: 'Apodo de la planta',
    example: 'Arrayán pequeño'
  })
  @IsNotEmpty()
  @IsString()
  apodo: string;

  @ApiProperty({
    description: 'ID de la especie',
    example: '1'
  })
  @IsNotEmpty()
  @IsNumber()
  especie_id: number;

  @ApiProperty({
    description: 'Estado de Salud de la planta',
    example: 'Optimo'
  })
  @IsNotEmpty()
  @IsEnum(EstadoSalud, { message: 'El estado de salud no es válido' })
  estado_salud: EstadoSalud;
}