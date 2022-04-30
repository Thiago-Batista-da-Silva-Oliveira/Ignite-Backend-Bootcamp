import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import {container} from 'tsrynge'

class ListCategoryController {
   async handle(request: Request, response:Response){
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
        const all = await listCategoriesUseCase.execute()
        return response.json(all)
    }

}

export {
    ListCategoryController
}