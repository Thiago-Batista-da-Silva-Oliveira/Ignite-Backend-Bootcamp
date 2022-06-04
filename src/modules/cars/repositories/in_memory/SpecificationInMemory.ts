import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { isDebuggerStatement } from "typescript";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
    private specifications:Specification[] = []

  async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) => ids.includes(specification.id))

        return allSpecifications
    }

   async findByName(name: string): Promise<Specification> {
        return this.specifications.find((specification) => specification.name === name)
    }

  async  create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
       const specification = new Specification()
       Object.assign(specification, {
           description,
           name
       })
        this.specifications.push(specification)

        return specification
    }
}

export {SpecificationRepositoryInMemory}