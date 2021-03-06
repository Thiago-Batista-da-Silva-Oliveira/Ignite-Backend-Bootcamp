import { app } from '@shared/infra/http/app'
import request from 'supertest'

describe("Create category controller", () => {
   it("should be able to create a new category" , async () => {
   const response = await request(app).post("/categories")
    .send({
      name: "Category Supertest",
      description: "Category Supertest"
    })
    expect(response.status).toBe(201)
   })
})