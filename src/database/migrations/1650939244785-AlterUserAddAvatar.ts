import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddAvatar1650939244785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn("users", new TableColumn({
          name: "avatar",
          type: "varchar",
          isNullable: true
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.dropColumn("users", "avatar")
    
    }

}
