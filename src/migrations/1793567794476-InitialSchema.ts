import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1793567794476 implements MigrationInterface {
    name = 'InitialSchema1793567794476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registros_riego" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "planta_id" integer NOT NULL, "fecha_riego" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "cantidad_ml" integer NOT NULL, "observaciones" varchar(100))`);
        await queryRunner.query(`CREATE TABLE "plantas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar(100) NOT NULL, "ubicacion" varchar(50) NOT NULL, "estado_salud" varchar(30) NOT NULL DEFAULT ('Saludable'), "fecha_ingreso" date NOT NULL, "especie_id" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "especies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre_comun" varchar(100) NOT NULL, "nombre_cientifico" varchar(100) NOT NULL, "origen" varchar(50) NOT NULL, "descripcion" text)`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar(100) NOT NULL, "email" varchar(150) NOT NULL, "rol" varchar(50) NOT NULL, "activo" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_registros_riego" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "planta_id" integer NOT NULL, "fecha_riego" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "cantidad_ml" integer NOT NULL, "observaciones" varchar(100), CONSTRAINT "FK_2c0485a09e4d9858bf8de16a368" FOREIGN KEY ("planta_id") REFERENCES "plantas" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_registros_riego"("id", "planta_id", "fecha_riego", "cantidad_ml", "observaciones") SELECT "id", "planta_id", "fecha_riego", "cantidad_ml", "observaciones" FROM "registros_riego"`);
        await queryRunner.query(`DROP TABLE "registros_riego"`);
        await queryRunner.query(`ALTER TABLE "temporary_registros_riego" RENAME TO "registros_riego"`);
        await queryRunner.query(`CREATE TABLE "temporary_plantas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar(100) NOT NULL, "ubicacion" varchar(50) NOT NULL, "estado_salud" varchar(30) NOT NULL DEFAULT ('Saludable'), "fecha_ingreso" date NOT NULL, "especie_id" integer NOT NULL, CONSTRAINT "FK_52eb74f83f062bf4b1fa99f4704" FOREIGN KEY ("especie_id") REFERENCES "especies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_plantas"("id", "nombre", "ubicacion", "estado_salud", "fecha_ingreso", "especie_id") SELECT "id", "nombre", "ubicacion", "estado_salud", "fecha_ingreso", "especie_id" FROM "plantas"`);
        await queryRunner.query(`DROP TABLE "plantas"`);
        await queryRunner.query(`ALTER TABLE "temporary_plantas" RENAME TO "plantas"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plantas" RENAME TO "temporary_plantas"`);
        await queryRunner.query(`CREATE TABLE "plantas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar(100) NOT NULL, "ubicacion" varchar(50) NOT NULL, "estado_salud" varchar(30) NOT NULL DEFAULT ('Saludable'), "fecha_ingreso" date NOT NULL, "especie_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "plantas"("id", "nombre", "ubicacion", "estado_salud", "fecha_ingreso", "especie_id") SELECT "id", "nombre", "ubicacion", "estado_salud", "fecha_ingreso", "especie_id" FROM "temporary_plantas"`);
        await queryRunner.query(`DROP TABLE "temporary_plantas"`);
        await queryRunner.query(`ALTER TABLE "registros_riego" RENAME TO "temporary_registros_riego"`);
        await queryRunner.query(`CREATE TABLE "registros_riego" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "planta_id" integer NOT NULL, "fecha_riego" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "cantidad_ml" integer NOT NULL, "observaciones" varchar(100))`);
        await queryRunner.query(`INSERT INTO "registros_riego"("id", "planta_id", "fecha_riego", "cantidad_ml", "observaciones") SELECT "id", "planta_id", "fecha_riego", "cantidad_ml", "observaciones" FROM "temporary_registros_riego"`);
        await queryRunner.query(`DROP TABLE "temporary_registros_riego"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "especies"`);
        await queryRunner.query(`DROP TABLE "plantas"`);
        await queryRunner.query(`DROP TABLE "registros_riego"`);
    }

}
