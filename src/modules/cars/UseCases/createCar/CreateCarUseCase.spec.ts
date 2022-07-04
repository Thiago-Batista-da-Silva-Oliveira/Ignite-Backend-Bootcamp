import { CarsRepositoryInMemory } from '@modules/cars/repositories/in_memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import {CreateCategoryUseCase} from '../createCategory/CreateCategoryUseCase'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase:CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })
    it("should be able to create a new car", async () => {
     const car = await createCarUseCase.execute({
        brand: "Brand",
        name: "Name car",
        category_id: 'category',
        daily_rate: 100,
        description: "Description car",
        fine_amount: 60,
        license_plate: "ABC-1234"
      })

      expect(car).toHaveProperty("id")
    })

    it("should not be able to create a car with exists license plate",async () => {
      await createCarUseCase.execute({
        brand: "Brand",
        name: "Name car",
        category_id: 'category',
        daily_rate: 100,
        description: "Description car",
        fine_amount: 60,
        license_plate: "ABC-1234"
       })

      expect(
         await createCarUseCase.execute({
          brand: "Brand",
          name: "Car2",
          category_id: 'category',
          daily_rate: 100,
          description: "Description car",
          fine_amount: 60,
          license_plate: "ABC-1234"
         })
       ).rejects.toEqual(new AppError("Car already exists!"))
    })

    
    it("should be able to create a car with available true by default", async () => {
      const car = await createCarUseCase.execute({
        brand: "Brand",
        name: "Car Available",
        category_id: 'category',
        daily_rate: 100,
        description: "Description car",
        fine_amount: 60,
        license_plate: "ABC-1234"
      }) 

      expect(car.available).toBe(true)
   })
})