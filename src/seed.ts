import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Especie } from './domain/entities/especie.entity';
import { Usuario } from './domain/entities/usuario.entity';
import { Planta } from './domain/entities/planta.entity';
import { RegistroRiego } from './domain/entities/registro-riego.entity';

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const especieRepo = app.get<Repository<Especie>>(getRepositoryToken(Especie));
  const usuarioRepo = app.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  const plantaRepo = app.get<Repository<Planta>>(getRepositoryToken(Planta));
  const riegoRepo = app.get<Repository<RegistroRiego>>(getRepositoryToken(RegistroRiego));

  console.log('🌱 Ejecutando Seeder...');

  // 1. Limpiar datos previos
  await riegoRepo.clear();
  await plantaRepo.clear();
  await especieRepo.clear();
  await usuarioRepo.clear();

  // 2. Crear Usuarios (coincidiendo con las columnas reales de la tabla usuarios)
  const usuario1 = await usuarioRepo.save({
    nombre: 'Maria Paz',
    email: 'maria@example.com',
    rol: 'admin',
    activo: true,
  } as any);

  const usuario2 = await usuarioRepo.save({
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    rol: 'user',
    activo: true,
  } as any);

  // 3. Crear Especies
  const especie1 = await especieRepo.save({
    nombre_comun: 'Monstera',
    nombre_cientifico: 'Monstera deliciosa',
    origen: 'América Tropical',
    descripcion: 'Planta de hojas grandes y caladas',
  } as any);

  const especie2 = await especieRepo.save({
    nombre_comun: 'Suculenta',
    nombre_cientifico: 'Echeveria elegans',
    origen: 'México',
    descripcion: 'Planta crasa muy resistente',
  } as any);

  // 4. Crear Plantas (según el esquema de la migración)
  const planta1 = await plantaRepo.save({
    nombre: 'Monstera de la Sala',
    ubicacion: 'Living',
    estado_salud: 'Excelente',
    fecha_ingreso: new Date(),
    especie_id: especie1.id,
  } as any);

  const planta2 = await plantaRepo.save({
    nombre: 'Mini Suculenta',
    ubicacion: 'Escritorio',
    estado_salud: 'Saludable',
    fecha_ingreso: new Date(),
    especie_id: especie2.id,
  } as any);

  // 5. Crear Registros de Riego
  await riegoRepo.save({
    planta_id: planta1.id,
    cantidad_ml: 500,
    observaciones: 'Riego matutino completo',
  } as any);

  await riegoRepo.save({
    planta_id: planta2.id,
    cantidad_ml: 100,
    observaciones: 'Riego ligero de mantenimiento',
  } as any);

  console.log('✅ ¡Seeder ejecutado con éxito! Registros iniciales insertados.');
  await app.close();
}

runSeeder();