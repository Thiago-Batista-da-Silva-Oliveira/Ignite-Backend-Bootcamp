
import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in_memory/CategoriestRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
})

describe("Create Category", () => {
  
  it("should be able to create a new category",async () => {
  const category = {
    name: "Category Test",
    description: "Category description Teste",
  }
    await createCategoryUseCase.execute({
        name:category.name,
        description: category.description,
    })

 const categoryCreated =  await categoriesRepositoryInMemory.findByName(category.name)
  expect(categoryCreated).toHaveProperty("id")
})

it("should not be able to create a new category with same name",async () => {
  expect(async() => {
    const category = {
        name: "Category Test",
        description: "Category description Teste",
      }
        await createCategoryUseCase.execute({
            name:category.name,
            description: category.description,
        })
  
        await createCategoryUseCase.execute({
          name:category.name,
          description: category.description,
      })
  }).rejects.toBeInstanceOf(AppError)
  
  })

})

