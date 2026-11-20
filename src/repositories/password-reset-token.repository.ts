import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordResetToken } from '../schemas/entities/password-reset-token.entity';

@Injectable()
export class PasswordResetTokenRepository {
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly repository: Repository<PasswordResetToken>,
  ) {}

  createAndSave(datos: {
    jti: string;
    usuario_id: number;
    expires_at: Date;
  }): Promise<PasswordResetToken> {
    const record = this.repository.create({
      ...datos,
      used: false,
    });
    return this.repository.save(record);
  }

  findByJti(jti: string): Promise<PasswordResetToken | null> {
    return this.repository.findOne({
      where: { jti },
      relations: { usuario: true },
    });
  }

  async markAsUsed(id: number): Promise<void> {
    await this.repository.update(id, { used: true });
  }
}
