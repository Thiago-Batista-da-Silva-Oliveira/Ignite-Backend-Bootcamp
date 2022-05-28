import { CarsRepositoryInMemory } from "@modules/cars/repositories/in_memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListAvailableCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list all available cars",async () => {
    const car =  await carsRepositoryInMemory.create({
           name: "Car1",
           description: "Carro",
           brand: "Audi",
           category_id: 'ad5saf4as84da',
           daily_rate: 110.0,
           fine_amount: 40,
           license_plate: "DEF-1234"
       })
      const cars=  await listCarsUseCase.execute({})

      console.log(cars)
    
      expect(cars).toEqual([car])
    
    })

    it("should be able to list all available cars by name" , async () => {
        const car =  await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro",
            brand: "Car_Brand",
            category_id: 'ad5saf4as84da',
            daily_rate: 110.0,
            fine_amount: 40,
            license_plate: "DEF-1234"
        })
       const cars=  await listCarsUseCase.execute({
           brand: "Car_Brand"
       })
     
       expect(cars).toEqual([car])
    })
})