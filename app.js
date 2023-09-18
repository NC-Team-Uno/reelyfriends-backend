const express = require("express");
const { getAllUsers } = require("./controller/userController");
const app = express();

app.get('/users', getAllUsers)

// app.listen(3000, () => {
//     console.log('listening on port 3000');
// })

module.exports = app