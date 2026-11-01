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

  // 2. Crear Usuarios
  const usuario1 = await usuarioRepo.save({ nombre: 'Maria Paz', email: 'maria@example.com', rol: 'admin' });
  const usuario2 = await usuarioRepo.save({ nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'user' });

  // 3. Crear Especies
  const especie1 = await especieRepo.save({
    nombre_comun: 'Monstera',
    nombre_cientifico: 'Monstera deliciosa',
    origen: 'América Tropical',
    frecuencia_riego_dias: 7,
    tipo_luz: 'Indirecta',
    descripcion: 'Planta de hojas grandes y caladas',
  });

  const especie2 = await especieRepo.save({
    nombre_comun: 'Suculenta',
    nombre_cientifico: 'Echeveria elegans',
    origen: 'México',
    frecuencia_riego_dias: 15,
    tipo_luz: 'Directa',
    descripcion: 'Planta crasa muy resistente',
  });

  // 4. Crear Plantas (incluyendo fecha_ingreso y estado_salud)
  const planta1 = await plantaRepo.save({
    nombre: 'Monstera de la Sala',
    ubicacion: 'Living',
    estado_salud: 'Excelente',
    fecha_ingreso: new Date(),
    especie_id: especie1.id,
    usuario_id: usuario1.id,
  });

  const planta2 = await plantaRepo.save({
    nombre: 'Mini Suculenta',
    ubicacion: 'Escritorio',
    estado_salud: 'Saludable',
    fecha_ingreso: new Date(),
    especie_id: especie2.id,
    usuario_id: usuario2.id,
  });

  // 5. Crear Registros de Riego
  await riegoRepo.save({ planta_id: planta1.id, cantidad_ml: 500, observaciones: 'Riego matutino completo' });
  await riegoRepo.save({ planta_id: planta2.id, cantidad_ml: 100, observaciones: 'Riego ligero de mantenimiento' });

  console.log('✅ ¡Seeder ejecutado con éxito! Registros iniciales insertados.');
  await app.close();
}

runSeeder();