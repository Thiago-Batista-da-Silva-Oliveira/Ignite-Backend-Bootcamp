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
      const specifications_id = ["54321"]
        await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})
    })

    it("should not be able to add a new specification to a non existent car",async () => {
       expect(async () => {
        const car_id = "1234";
        const specifications_id = ["54321"]
          await createCarSpecificationUseCase.execute({car_id, specifications_id})
       }).rejects.toBeInstanceOf(AppError)
      })
})