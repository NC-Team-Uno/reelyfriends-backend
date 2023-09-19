const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
const { seed } = require("../data/seed");
const testUsers = require("../data/usersData");

beforeAll(() => {
  return seed();
});

afterAll(() => {
  mongoose.connection.close();
});

describe("GET /users", () => {
  test("200: should respond with an array of all users", () => {
    return request(app)
      .get("/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(testUsers.length);
        expect(Array.isArray(body)).toBe(true);
      });
  });
  test("200: should return all users, with the following properties: username, avatar, streamingServices, preferences, wishlist, likedFilms, friends, watchgroups, _id, _v", () => {
    return request(app)
      .get("/users")
      .expect(200)
      .then(({ body }) => {
        body.forEach((user) => {
          expect(user).toMatchObject({
            _id: expect.any(String),
            username: expect.any(String),
            avatar: expect.any(String),
            streamingServices: expect.any(Array),
            preferences: expect.any(Array),
            wishlist: expect.any(Array),
            likedFilms: expect.any(Array),
            friends: expect.any(Array),
            watchGroups: expect.any(Array),
            __v: expect.any(Number),
          });
        });
      });
  });
});

describe("GET /users/:username", () => {
  test("200:should return a user object based on the name provided", () => {
    return request(app)
      .get("/users/user1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          _id: expect.any(String),
          __v: expect.any(Number),
          username: "user1",
          avatar: "https://example.com/avatar/user1.jpg",
          streamingServices: ["Netflix", "Amazon Prime", "Hulu"],
          preferences: ["Horror", "Comedy", "Action"],
          wishlist: ["film101", "film102", "film103", "film104"],
          likedFilms: ["film101", "film102"],
          friends: ["2", "3"],
          watchGroups: ["101", "102", "103"],
        });
      });
  });

  test("404: should return not found if the user doesnt exist", () => {
    return request(app)
      .get("/users/user999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not Found");
      });
  });

//   test.only("400: should return Bad Request if given an invalid type of username", () => {
//     return request(app)
//       .get('/users/:username')
//       .expect(400)
//       .then(({ body }) => {
//         expect(body.message).toBe("Bad Request");
//   });
// })
})

describe('POST /users', () => {
  test('201: should add a user to the db', () => { 
    const newUser = {
      username: "banana",
      avatar: "https://example.com/avatar/user1.jpg",
      streamingServices: ["Netflix", "Amazon Prime", "Hulu"],
      preferences: ["Horror", "Comedy", "Action"],
      wishlist: ["film101", "film102", "film103", "film104"],
      likedFilms: ["film101", "film102"],
      friends: ["2", "3"],
      watchGroups: ["101", "102", "103"],
    }

    return request(app).post('/users', newUser).expect(201).then(({body})=>{
const {addedUser} = body
expect(addedUser).toMatchObject({
  ...newUser,
  _id: expect.any(String),
  __v: expect.any(Number),
});
    })
   })
})