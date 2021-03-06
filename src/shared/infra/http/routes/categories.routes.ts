import { Router} from 'express'
import { ListCategoryController } from '../../../../modules/cars/UseCases/listCategories/ListCategoryController';
import multer from 'multer'
import { ImportCategoryController } from '../../../../modules/cars/UseCases/importCategory/ImportCategoryController'; 
import {CreateCategoryController} from "../../../../modules/cars/UseCases/createCategory/CreateCategoryController"
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router()

const upload = multer({
  dest: "./tmp",
})
const importCategoryController = new ImportCategoryController()
const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()

categoriesRoutes.post("/", createCategoryController.handle)

categoriesRoutes.get("/", listCategoryController.handle )

categoriesRoutes.post("/import",ensureAuthenticated,ensureAdmin,upload.single("file"),importCategoryController.handle )

export {categoriesRoutes}