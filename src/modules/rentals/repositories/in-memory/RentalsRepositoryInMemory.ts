import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
 
    retals:Rental[] = []
 
  async  findOpenRentalByCar(car_id: string): Promise<Rental> {
      return this.retals.find(rental => rental.car_id === car_id && rental.end_date === null)
    }

   async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.retals.find(rental => rental.user_id === user_id && rental.end_date === null)
    }
}

export {RentalsRepositoryInMemory}