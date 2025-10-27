import { MigrationInterface, QueryRunner } from "typeorm";

export class First1761518295769 implements MigrationInterface {
    name = 'First1761518295769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`services\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` text NULL, \`price\` decimal(10,2) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`barber_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cep\` varchar(10) NOT NULL, \`street\` varchar(255) NOT NULL, \`number\` varchar(20) NOT NULL, \`complement\` varchar(100) NULL, \`neighborhood\` varchar(100) NOT NULL, \`city\` varchar(100) NOT NULL, \`state\` varchar(2) NOT NULL, \`latitude\` decimal(10,7) NULL, \`longitude\` decimal(10,7) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`customerName\` varchar(255) NOT NULL, \`rating\` int NOT NULL COMMENT 'Nota de 1 a 5', \`isApproved\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`barber_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`barber\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(20) NOT NULL, \`whatsapp\` varchar(20) NULL, \`description\` text NOT NULL, \`priceRange\` enum ('$', '$$', '$$$') NOT NULL COMMENT 'Faixa de preço: $ = Econômico, $$ = Moderado, $$$ = Premium', \`logo\` varchar(500) NULL, \`images\` text NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isFeatured\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`addressId\` int NULL, UNIQUE INDEX \`IDX_0e6064ef4fb8f64ec4e7918a5d\` (\`email\`), UNIQUE INDEX \`REL_ef70522f95d7f7b959cb043b8e\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`working_hours\` (\`id\` varchar(36) NOT NULL, \`dayOfWeek\` enum ('Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo') NOT NULL, \`openTime\` time NOT NULL, \`closeTime\` time NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`barber_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`services\` ADD CONSTRAINT \`FK_6cd3beb692e3459ef1b64aa15a0\` FOREIGN KEY (\`barber_id\`) REFERENCES \`barber\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_48ea780cc82ddd97e87de582697\` FOREIGN KEY (\`barber_id\`) REFERENCES \`barber\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`barber\` ADD CONSTRAINT \`FK_ef70522f95d7f7b959cb043b8e7\` FOREIGN KEY (\`addressId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`working_hours\` ADD CONSTRAINT \`FK_c734c5457f4c8b724b6093a0a51\` FOREIGN KEY (\`barber_id\`) REFERENCES \`barber\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`working_hours\` DROP FOREIGN KEY \`FK_c734c5457f4c8b724b6093a0a51\``);
        await queryRunner.query(`ALTER TABLE \`barber\` DROP FOREIGN KEY \`FK_ef70522f95d7f7b959cb043b8e7\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_48ea780cc82ddd97e87de582697\``);
        await queryRunner.query(`ALTER TABLE \`services\` DROP FOREIGN KEY \`FK_6cd3beb692e3459ef1b64aa15a0\``);
        await queryRunner.query(`DROP TABLE \`working_hours\``);
        await queryRunner.query(`DROP INDEX \`REL_ef70522f95d7f7b959cb043b8e\` ON \`barber\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e6064ef4fb8f64ec4e7918a5d\` ON \`barber\``);
        await queryRunner.query(`DROP TABLE \`barber\``);
        await queryRunner.query(`DROP TABLE \`reviews\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
        await queryRunner.query(`DROP TABLE \`services\``);
    }

}
