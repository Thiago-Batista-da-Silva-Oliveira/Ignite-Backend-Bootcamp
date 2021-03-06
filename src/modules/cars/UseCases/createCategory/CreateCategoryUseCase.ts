import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICaregoryRepository";
import {inject, injectable} from "tsyringe"

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
 /*
    private categoriesRepository:CategoriesRepository
    constructor(categoriesRepository: CategoriesRepository){
        this.categoriesRepository = categoriesRepository
    }
*/
constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository){
}
 async execute({name, description}:IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if(categoryAlreadyExists) {
        throw new AppError("Category already exists")
    }

  this.categoriesRepository.create({name, description})
  }

}


export {
    CreateCategoryUseCase
}