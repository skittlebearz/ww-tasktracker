import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class AddProject1645146236407 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'project',
            columns: [
              {
                name: 'id',
                isPrimary: true,
                isGenerated: true,
                type: 'int',
              },
              {
                name: 'title',
                type: 'text',
                isNullable: false,
              },
              {
                name: 'contextId',
                type: 'text',
                isNullable: false,
              },
              {
                name: 'leaderID',
                type: 'int',
                isNullable: false,
              }
            ],
          }),
        );
    
        await queryRunner.createTable(
            new Table({
              name: 'user_project',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                  name: 'userId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'projectId',
                  type: 'int',
                  isNullable: false,
                },
              ],
            }),
          );
      
          await queryRunner.createForeignKey(
            'user_project',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
          );
      
          await queryRunner.createForeignKey(
            'user_project',
            new TableForeignKey({
              columnNames: ['projectId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
          );
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable('user_project');
          await queryRunner.dropTable('project');
        }
}