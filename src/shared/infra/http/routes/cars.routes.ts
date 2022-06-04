import { CreateCarController } from '@modules/cars/UseCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/UseCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/UseCases/listAvailableCars/ListAvailableCarsController'
import {Router} from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()


carsRoutes.post("/",ensureAuthenticated, ensureAdmin,createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle )

carsRoutes.post("/specifications/:id",ensureAuthenticated,ensureAdmin, createCarSpecificationController.handle)

export {carsRoutes}