import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Especie } from '../schemas/entities/especie.entity';
import { Usuario } from '../schemas/entities/usuario.entity';
import { Planta } from '../schemas/entities/planta.entity';
import { RegistroRiego } from '../schemas/entities/registro-riego.entity';
import { RefreshToken } from '../schemas/entities/refresh-token.entity';
import { PasswordResetToken } from '../schemas/entities/password-reset-token.entity';

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const especieRepo = app.get<Repository<Especie>>(getRepositoryToken(Especie));
  const usuarioRepo = app.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  const plantaRepo = app.get<Repository<Planta>>(getRepositoryToken(Planta));
  const riegoRepo = app.get<Repository<RegistroRiego>>(getRepositoryToken(RegistroRiego));
  const refreshRepo = app.get<Repository<RefreshToken>>(getRepositoryToken(RefreshToken));
  const resetRepo = app.get<Repository<PasswordResetToken>>(getRepositoryToken(PasswordResetToken));

  console.log('Ejecutando Seeder...');

  // 1. Limpiar datos previos respetando integridad referencial
  await resetRepo.clear();
  await refreshRepo.clear();
  await riegoRepo.clear();
  await plantaRepo.clear();
  await especieRepo.clear();
  await usuarioRepo.clear();

  // 2. Generar hashes seguros (mínimo 12 caracteres)
  const adminPasswordHash = await bcrypt.hash('AdminRiego2026!', 10);
  const userPasswordHash = await bcrypt.hash('UsuarioRiego2026!', 10);

  // 3. Crear Usuarios
  const usuario1 = await usuarioRepo.save({
    nombre: 'Maria Paz',
    email: 'maria@example.com',
    password_hash: adminPasswordHash,
    rol: 'admin',
    activo: true,
    token_version: 1,
  });

  const usuario2 = await usuarioRepo.save({
    nombre: 'Juan Perez',
    email: 'juan@example.com',
    password_hash: userPasswordHash,
    rol: 'user',
    activo: true,
    token_version: 1,
  });

  // 4. Crear Especies
  const especie1 = await especieRepo.save({
    nombre_comun: 'Monstera',
    nombre_cientifico: 'Monstera deliciosa',
    origen: 'America Tropical',
    descripcion: 'Planta de hojas grandes y caladas',
  });

  const especie2 = await especieRepo.save({
    nombre_comun: 'Suculenta',
    nombre_cientifico: 'Echeveria elegans',
    origen: 'Mexico',
    descripcion: 'Planta crasa muy resistente',
  });

  // 5. Crear Plantas
  const planta1 = await plantaRepo.save({
    apodo: 'Mi monstera',
    ubicacion: 'Living',
    estado_salud: 'Excelente',
    fecha_adquisicion: '2026-11-01',
    especie_id: especie1.id,
    usuario_id: usuario1.id,
  });

  const planta2 = await plantaRepo.save({
    apodo: 'Mi suculenta',
    ubicacion: 'Escritorio',
    estado_salud: 'Saludable',
    fecha_adquisicion: '2026-11-01',
    especie_id: especie2.id,
    usuario_id: usuario2.id,
  });

  // 6. Crear Registros de Riego
  await riegoRepo.save({
    planta_id: planta1.id,
    cantidad_ml: 500,
    observaciones: 'Riego matutino completo',
  });

  await riegoRepo.save({
    planta_id: planta2.id,
    cantidad_ml: 100,
    observaciones: 'Riego ligero de mantenimiento',
  });

  console.log('Seeder ejecutado con exito.');
  console.log('Credenciales iniciales -> Admin: maria@example.com / AdminRiego2026! | User: juan@example.com / UsuarioRiego2026!');
  await app.close();
}

runSeeder();
