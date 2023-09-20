const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
const { seed } = require("../data/seed");
const testUsers = require("../data/testData/usersData");
const { User } = require("../schemas/userSchemas");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DATABASE_URL);
  return seed(testUsers);
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
});

describe("POST /users", () => {
  test("201: should add a user to the db", () => {
    const newUser = {
      username: "banana",
      avatar: "https://example.com/avatar/user1.jpg",
      streamingServices: ["Netflix", "Amazon Prime", "Hulu"],
      preferences: ["Horror", "Comedy", "Action"],
      wishlist: ["film101", "film102", "film103", "film104"],
      likedFilms: ["film101", "film102"],
      friends: ["2", "3"],
      watchGroups: ["101", "102", "103"],
    };

    return request(app)
      .post("/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        const { addedUser } = body;
        expect(addedUser).toMatchObject({
          ...newUser,
          _id: expect.any(String),
          __v: expect.any(Number),
        });
      });
  });
});

describe('PATCH /users/:username', () => { 
    test('200: should update the user profile', () => {
        const testPatch = {streamingServices: ['newStreamingService']}
        return request(app)
        .patch('/users/user1')
        .send(testPatch)
        .expect(200)
        .then(({body}) => {
            const updatedUser = body
            expect(updatedUser.streamingServices).toEqual(['newStreamingService'])
        })
    });

     test("404: should not update the user profile if the user doesnt exist ", () => {
       const testPatch = { streamingServices: ["newStreamingService"] };
      return request(app).patch('/users/user9999').send(testPatch).expect(404).then(({body}) => { 
        expect(body.message).toBe('Not Found')
     });
 })


 describe('DELETE /users/:username', () => {
    test('204: should delete a user by username', () => {
        return request(app)
        .delete('/users/user1')
        .expect(204).then(() => {
            return User.find({username: 'user1'}).then((result) => {
                expect(result).toEqual([])
            })
        })
    });

         test("404: should not delete the user profile if the user doesnt exist ", () => {
           const testPatch = { streamingServices: ["newStreamingService"] };
           return request(app)
             .delete("/users/user6564")
             .expect(404)
             .then(({ body }) => {
               expect(body.message).toBe("Not Found");
             });
         });
 })
})


