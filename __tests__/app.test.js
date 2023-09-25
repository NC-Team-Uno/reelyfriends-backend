const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
const { seed } = require("../data/seed");
const testUsers = require("../data/testData/usersData");
const { User } = require("../schemas/userSchemas");
const groups = require("../data/testData/groups");
const { Group } = require("../schemas/groupSchema");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DATABASE_URL);
  return seed(testUsers, groups);
});

afterAll(() => {
  mongoose.connection.close();
});

describe("USERS", () => {
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
            friends: ["user2", "user3"],
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
          return User.find().then((usersInDb) => {
            expect(usersInDb.length).toBe(testUsers.length + 1);
          });
        });
    });
  });

  describe("PATCH /users/:username", () => {
    test("200: should update the user profile", () => {
      const testPatch = { streamingServices: ["newStreamingService"] };
      return request(app)
        .patch("/users/user1")
        .send(testPatch)
        .expect(200)
        .then(({ body }) => {
          const updatedUser = body;
          expect(updatedUser.streamingServices).toEqual([
            "newStreamingService",
          ]);
        });
    });

    test("404: should not update the user profile if the user doesnt exist ", () => {
      const testPatch = { streamingServices: ["newStreamingService"] };
      return request(app)
        .patch("/users/user9999")
        .send(testPatch)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not Found");
        });
    });
  });

  describe("DELETE /users/:username", () => {
    test("204: should delete a user by username", () => {
      return request(app)
        .delete("/users/user20")
        .expect(204)
        .then(() => {
          return User.find({ username: "user20" }).then((result) => {
            expect(result).toEqual([]);
          });
        });
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
  });
});

describe("GROUP", () => {
  describe("GET /groups", () => {
    test("200: should return all groups", () => {
      return request(app)
        .get("/groups")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(groups.length);
          expect(Array.isArray(body)).toBe(true);
        });
    });
    test("200: should return all groups, with the following properties: groupAdmin, name, avatar, streamingServices, preferences, likedFilms, members, _id, _v", () => {
      return request(app)
        .get("/groups")
        .expect(200)
        .then(({ body }) => {
          body.forEach((group) => {
            expect(group).toMatchObject({
              _id: expect.any(String),
              groupAdmin: expect.any(String),
              name: expect.any(String),
              avatar: expect.any(String),
              streamingServices: expect.any(Array),
              preferences: expect.any(Array),
              likedFilms: expect.any(Array),
              members: expect.any(Array),
              __v: expect.any(Number),
            });
          });
        });
    });
  });
  describe("GET /groups/:name", () => {
    test("200: should return a group object based on the name provided", () => {
      return request(app)
        .get("/groups/Movie Lovers")
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            _id: expect.any(String),
            __v: expect.any(Number),
            groupAdmin: "user1",
            name: "Movie Lovers",
            avatar: "https://example.com/group/avatar/movie_lovers.jpg",
            members: ["user1", "user2", "user3"],
            streamingServices: ["Netflix", "Amazon Prime", "Hulu"],
            preferences: ["Horror", "Comedy", "Action"],
            likedFilms: [
              "film101",
              "film102",
              "film201",
              "film202",
              "film301",
              "film302",
            ],
          });
        });
    });
    test("404: should respond with Not Found if the group does not exist", () => {
      return request(app)
        .get("/groups/nonExistant")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not Found");
        });
    });
  });
  describe("POST /groups", () => {
    test("201: should create a new group on the db", () => {
      const newGroup = {
        groupAdmin: "user2",
        name: "testGroup",
        avatar: "https://example.com/group/avatar/movie_lovers.jpg",
        members: ["user2", "user3"],
      };

      return request(app)
        .post("/groups")
        .send(newGroup)
        .expect(201)
        .then(({ body }) => {
          const { addedGroup } = body;
          expect(addedGroup).toHaveProperty('_id', expect.any(String))
          expect(addedGroup).toHaveProperty('__v', expect.any(Number))
          expect(addedGroup).toHaveProperty('groupAdmin', 'user2')
          expect(addedGroup).toHaveProperty('name', 'testGroup')
          expect(addedGroup).toHaveProperty('avatar', "https://example.com/group/avatar/movie_lovers.jpg")
          expect(addedGroup).toHaveProperty('members', ["user2", "user3"])
          expect(addedGroup).toHaveProperty('streamingServices', ['Disney+', 'HBO Max', 'Apple TV+', 'Hulu', 'Amazon Prime'])
          expect(addedGroup).toHaveProperty('preferences', ['Drama', 'Comedy', 'Documentary', 'Romance', 'Fantasy'])
          expect(addedGroup).toHaveProperty('likedFilms', [ 'film201', 'film202', 'film301', 'film302' ])
          return Group.find().then((groupsInDb) => {
            expect(groupsInDb.length).toBe(groups.length + 1);
          });
        });
    });
  });

  describe("PATCH /groups/:name", () => {
    test("200: should update the group", () => {
      const testPatch = { streamingServices: ["updatedStreamingServices"] };
      return request(app)
        .patch("/groups/Movie Lovers")
        .send(testPatch)
        .expect(200)
        .then(({ body }) => {
          const updatedGroup = body;
          expect(updatedGroup.streamingServices).toEqual([
            "updatedStreamingServices",
          ]);
        });
    });
    test("404: recieve Not Found if group does not exist", () => {
      const testPatch = { streamingServices: ["updatedStreamingServices"] };
      return request(app)
        .patch("/groups/nonExistantGroup")
        .send(testPatch)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not Found");
        });
    });
  });

  describe("DELETE /groups/:name", () => {
    test("204: should delete a group by name", () => {
      return request(app)
        .delete("/groups/Movie Lovers")
        .expect(204)
        .then(() => {
          return Group.find({ name: "Movie Lovers" }).then((result) => {
            expect(result).toEqual([]);
          });
        });
    });

    test("404: should not delete the group if the group doesnt exist ", () => {
      return request(app)
        .delete("/groups/bananas")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not Found");
        });
    });
  });
});
