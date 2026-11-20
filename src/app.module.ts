import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Especie } from './schemas/entities/especie.entity';
import { Planta } from './schemas/entities/planta.entity';
import { RegistroRiego } from './schemas/entities/registro-riego.entity';
import { Usuario } from './schemas/entities/usuario.entity';
import { RefreshToken } from './schemas/entities/refresh-token.entity';
import { PasswordResetToken } from './schemas/entities/password-reset-token.entity';

import { PlantasController } from './controllers/plantas.controller';
import { EspeciesController } from './controllers/especies.controller';
import { RiegosController } from './controllers/riegos.controller';
import { UsuariosController } from './controllers/usuarios.controller';

import { PlantasService } from './services/plantas.service';
import { EspeciesService } from './services/especies.service';
import { RiegosService } from './services/riegos.service';
import { UsuariosService } from './services/usuarios.service';

import { EspecieRepository } from './repositories/especie.repository';
import { PlantaRepository } from './repositories/planta.repository';
import { RegistroRiegoRepository } from './repositories/registro-riego.repository';
import { UsuarioRepository } from './repositories/usuario.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { PasswordResetTokenRepository } from './repositories/password-reset-token.repository';
import { InitialSchema1793567794476 } from './migrations/1793567794476-InitialSchema';
import { AddAuthAndTokens1793567800000 } from './migrations/1793567800000-AddAuthAndTokens';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_DATABASE || 'database.sqlite',
      entities: [
        Especie,
        Planta,
        RegistroRiego,
        Usuario,
        RefreshToken,
        PasswordResetToken,
      ],
      migrations: [InitialSchema1793567794476, AddAuthAndTokens1793567800000],
      migrationsRun: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Especie,
      Planta,
      RegistroRiego,
      Usuario,
      RefreshToken,
      PasswordResetToken,
    ]),
  ],
  controllers: [
    PlantasController,
    EspeciesController,
    RiegosController,
    UsuariosController,
  ],
  providers: [
    PlantasService,
    EspeciesService,
    RiegosService,
    UsuariosService,
    EspecieRepository,
    PlantaRepository,
    RegistroRiegoRepository,
    UsuarioRepository,
    RefreshTokenRepository,
    PasswordResetTokenRepository,
  ],
  exports: [
    UsuarioRepository,
    RefreshTokenRepository,
    PasswordResetTokenRepository,
  ],
})
export class AppModule {}
