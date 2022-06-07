import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1654535826655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'cpf', type: 'varchar', isNullable: false },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          { name: 'birthdate', type: 'Date', isNullable: false },
          { name: 'obs', type: 'varchar', isNullable: true },
          {
            name: 'permissions',
            type: 'enum',
            enum: ['admin', 'user'],
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
