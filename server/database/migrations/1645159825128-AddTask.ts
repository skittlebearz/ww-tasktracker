import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class AddTask1645159825128 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'task',
            columns: [
              {
                name: 'id',
                isPrimary: true,
                isGenerated: true,
                type: 'int',
              },
              {
                name: 'userId',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'parentProject',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'completionStatus',
                type: 'boolean',
                isNullable: false,
              },
              {
                name: 'title',
                type: 'text',
                isNullable: false,
              },
              {
                name: 'description',
                type: 'text',
                isNullable: false,
              },
              {
                name: 'timeEstimate',
                type: 'int',
                isNullable: false,
              },
            ],
          }),
        );
    
        await queryRunner.createForeignKey(
          'task',
          new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          }),
        );

        await queryRunner.createForeignKey(
            'task',
            new TableForeignKey({
              columnNames: ['parentProject'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
          );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task');
      }
    }
    