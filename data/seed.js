const { User } = require("../schemas/userSchemas");
const mongoose = require("mongoose");
const testUsers = require("./usersData");
require("dotenv").config();

exports.seed = () => {
  mongoose.connect(process.env.TEST_DATABASE_URL).then(() => {
  User.collection.drop();
  User.insertMany(testUsers)
    .catch((err) => {
      console.log(err);
    });
});
}



