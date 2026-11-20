import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../schemas/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repository: Repository<RefreshToken>,
  ) {}

  createAndSave(datos: {
    usuario_id: number;
    token_hash: string;
    expires_at: Date;
  }): Promise<RefreshToken> {
    const token = this.repository.create({
      ...datos,
      revoked: false,
      replaced_by_hash: null,
    });
    return this.repository.save(token);
  }

  findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    return this.repository.findOne({
      where: { token_hash: tokenHash },
      relations: { usuario: true },
    });
  }

  async revokeToken(id: number, replacedByHash?: string): Promise<void> {
    await this.repository.update(id, {
      revoked: true,
      replaced_by_hash: replacedByHash ?? null,
    });
  }

  async revokeAllForUser(usuarioId: number): Promise<void> {
    await this.repository.update(
      { usuario_id: usuarioId, revoked: false },
      { revoked: true },
    );
  }
}
