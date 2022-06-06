import { CreateCarController } from '@modules/cars/UseCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/UseCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/UseCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@modules/cars/UseCases/uploadCarImage/UploadCarImagesController'

import {Router} from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfig from '../../../../config/upload'

const carsRoutes = Router()

const upload = multer(uploadConfig.upload("./tmp/cars"))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post("/",ensureAuthenticated, ensureAdmin,createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle )

carsRoutes.post("/specifications/:id",ensureAuthenticated,ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post('/images/:id',ensureAuthenticated, ensureAdmin,upload.array("images"),uploadCarImagesController.handle )

export {carsRoutes}