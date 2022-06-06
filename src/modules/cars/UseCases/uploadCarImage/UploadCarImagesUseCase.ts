import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsIimageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesReposotory:ICarsImagesRepository
    ){}
    async execute({car_id, images_name}: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImagesReposotory.create(car_id, image)
        })
    }
}

export {
    UploadCarImagesUseCase
}