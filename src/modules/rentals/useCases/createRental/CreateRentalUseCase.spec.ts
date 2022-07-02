import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from 'dayjs'
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in_memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider:DayjsDateProvider;
let carsRepositoryInMemory:CarsRepositoryInMemory

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayJsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory,dayJsDateProvider,carsRepositoryInMemory)

  })

  it("should be able to create a new rental", async () => {
  const car = await carsRepositoryInMemory.create({
    name: "Test",
    description: "Car Test",
    daily_rate: 100,
    license_plate: "test",
    fine_amount: 40,
    category_id: "1234",
    brand: "brand"
  })
    const rental = await createRentalUseCase.execute({
             user_id: "12345",
             car_id: car.id,
             expected_return_date: dayAdd24Hours,
         })

         expect(rental).toHaveProperty("id")
         expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    
   expect(async () => {
    await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1212124",
        expected_return_date: dayAdd24Hours,
    })
    
    await createRentalUseCase.execute({
         user_id: "12345",
         car_id: "121212",
         expected_return_date: dayAdd24Hours,
     })
   }).rejects.toBeInstanceOf(AppError)

})

it("should not be able to create a new rental if there is another open to the same car", async () => {
    
    expect(async () => {
     await createRentalUseCase.execute({
         user_id: "123453",
         car_id: "121212",
         expected_return_date: dayAdd24Hours,
     })
     
     await createRentalUseCase.execute({
          user_id: "12345",
          car_id: "121212",
          expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
 
 })

 it("should not be able to create a new rental with invalid return time", async () => {
    
  expect(async () => {
   await createRentalUseCase.execute({
       user_id: "123453",
       car_id: "121212",
       expected_return_date: dayAdd24Hours,
   })
   
   await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
    })
  }).rejects.toBeInstanceOf(AppError)

})

})