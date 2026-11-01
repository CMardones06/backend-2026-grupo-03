import { IsNotEmpty, IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class CrearRiegoDto {
  @IsInt()
  @IsNotEmpty()
  planta_id: number;

  @IsInt()
  @Min(1)
  cantidad_ml: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  observaciones?: string;
}