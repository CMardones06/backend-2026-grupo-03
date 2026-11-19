import { DataSource } from 'typeorm';
import { Especie } from './schemas/entities/especie.entity';
import { Planta } from './schemas/entities/planta.entity';
import { RegistroRiego } from './schemas/entities/registro-riego.entity';
import { Usuario } from './schemas/entities/usuario.entity';
import { RefreshToken } from './schemas/entities/refresh-token.entity';
import { PasswordResetToken } from './schemas/entities/password-reset-token.entity';

export const AppDataSource = new DataSource({
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
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
