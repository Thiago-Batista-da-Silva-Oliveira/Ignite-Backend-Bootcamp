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