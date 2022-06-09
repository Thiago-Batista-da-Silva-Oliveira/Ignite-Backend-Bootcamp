import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICaregoryRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import {container} from 'tsyringe'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsIimageRepository'
import { CarsImagesRespository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository> (
   "SpecificationsRepository",
   SpecificationRepository
)

container.registerSingleton<IUsersRepository> (
    "UsersRepository",
    UsersRepository
 )

container.registerSingleton<ICarsRepository> (
    "CarsRepository",
    CarsRepository
 )

 container.registerSingleton<ICarsImagesRepository> (
    "CarsImagesRepository",
    CarsImagesRespository
 )

 /*
 import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRentals1654482596403 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createTable(
            new Table({
                name: "rentals",
                columns: [
                    {name: "id", type: "uuid", isPrimary: true},
                 {
                     name: "car_id",
                     type: "uuid"
                 },
                 {
                     name: "user_id",
                     type: "uuid"
                 },
                 {
                     name: "start_date",
                     type: "timestamp",
                     default: "now()"
                 },
                 {
                    name: "end_date",
                    type: "timestamp",
                },
                {
                    name: "expected_return_date",
                    type: "timestamp",
                },
                {
                    name: "total",
                    type: "numeric",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                },
                ],
                foreignKeys: [
                    {
                      name: "FKCarRental",
                      referencedTableName: "cars",
                      referencedColumnNames: ["id"],
                      columnNames: ["car_id"],
                      onDelete: "SET NULL",
                      onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserRental",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ]
            })
        )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals")
    }

}




 */