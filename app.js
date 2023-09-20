const express = require("express");
const { getAllUsers, getUserByUsername, postUser, patchUser, deleteUser } = require("./controller/userController");
const { handle404, handle400, handle500 } = require("./controller/errorController");
const app = express();
app.use(express.json());

app.get('/users', getAllUsers)

app.get("/users/:username", getUserByUsername);

app.post("/users", postUser);

app.patch('/users/:username', patchUser)

app.delete('/users/:username', deleteUser)

app.use(handle404)
app.use(handle500);
module.exports = app