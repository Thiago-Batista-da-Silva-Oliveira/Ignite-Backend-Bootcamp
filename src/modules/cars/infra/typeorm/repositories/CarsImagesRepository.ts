import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsIimageRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImages";

class CarsImagesRespository implements ICarsImagesRepository {
  private repository:Repository<CarImage>;

  constructor(){
      this.repository = getRepository(CarImage)
  }
    async create(car_id: string, image_name: string): Promise<CarImage> {
      const carImage = this.repository.create({
          car_id,
          image_name
      });
      await this.repository.save(carImage);
      return carImage;
  }
}

export {CarsImagesRespository}