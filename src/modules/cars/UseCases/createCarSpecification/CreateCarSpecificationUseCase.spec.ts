import { CarsRepositoryInMemory } from "@modules/cars/repositories/in_memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in_memory/SpecificationInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory:SpecificationRepositoryInMemory

describe("Create Car Specification", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory,specificationsRepositoryInMemory)
    })
    it("should be able to add a new specification to the car",async () => {
     const car = await carsRepositoryInMemory.create({
            brand: "Brand",
            name: "Name car",
            category_id: 'category',
            daily_rate: 100,
            description: "Description car",
            fine_amount: 60,
            license_plate: "ABC-1234"
     })

     const specification = await specificationsRepositoryInMemory.create({
       description: "test",
       name: "test"
     })
      const specifications_id = [specification.id]
       const specificationCars=  await createCarSpecificationUseCase.execute
        ({car_id: car.id, specifications_id})
   
        expect(specificationCars).toHaveProperty("specifications")
        expect(specificationCars.specifications.length).toBe(1)
   
      })

    it("should not be able to add a new specification to a non existent car",async () => {
      const car_id = "1234";
      const specifications_id = ["54321"]
      expect(
          await createCarSpecificationUseCase.execute({car_id, specifications_id})
       ).rejects.toEqual(new AppError("Car does not exists!"))
      })
})