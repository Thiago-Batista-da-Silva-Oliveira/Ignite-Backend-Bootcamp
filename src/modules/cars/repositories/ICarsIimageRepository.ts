import { CarImage } from "../infra/typeorm/entities/CarImages";

interface ICarsImagesRepository {
    create (car_idd: string, image_name: string):Promise<CarImage> 
}

export {ICarsImagesRepository}