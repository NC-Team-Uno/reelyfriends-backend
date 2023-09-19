const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
const { seed } = require("../data/seed");

beforeAll(() => {
    return seed()
})

afterAll(() => {
  mongoose.connection.close();
});

describe("/users", () => {
  test("200: should respond with an return all users", () => {
    return request(app)
      .get("/users")
      .expect(200)
      .then(({body}) => {
        console.log(body);
      });
  });
});
