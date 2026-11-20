import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthAndTokens1793567800000 implements MigrationInterface {
  name = 'AddAuthAndTokens1793567800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD COLUMN "password_hash" varchar(255)`
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD COLUMN "token_version" integer NOT NULL DEFAULT (1)`
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuario_id" integer NOT NULL, "token_hash" varchar(255) NOT NULL, "expires_at" datetime NOT NULL, "revoked" boolean NOT NULL DEFAULT (0), "replaced_by_hash" varchar(255), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_refresh_token_hash" UNIQUE ("token_hash"), CONSTRAINT "FK_refresh_tokens_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `CREATE TABLE "password_reset_tokens" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "jti" varchar(100) NOT NULL, "usuario_id" integer NOT NULL, "expires_at" datetime NOT NULL, "used" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_password_reset_jti" UNIQUE ("jti"), CONSTRAINT "FK_password_reset_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "password_reset_tokens"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "token_version"`);
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "password_hash"`);
  }
}
