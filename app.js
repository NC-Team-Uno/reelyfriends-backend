const express = require("express");
const { getAllUsers, getUserByUsername, postUser, patchUser, deleteUser } = require("./controller/userController");
const { handle404, handle500 } = require("./controller/errorController");
const app = express();

const mongoose = require("mongoose");
const uri = require("./connection");

mongoose.connect(uri)


app.use(express.json());

app.get('/users', getAllUsers)

app.get("/users/:username", getUserByUsername);

app.post("/users", postUser);

app.patch('/users/:username', patchUser)

app.delete('/users/:username', deleteUser)

app.use(handle404)
app.use(handle500);
module.exports = app