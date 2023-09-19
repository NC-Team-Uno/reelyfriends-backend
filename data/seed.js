const { User } = require("../schemas/userSchemas");
const mongoose = require("mongoose");
const testUsers = require("./usersData");
require("dotenv").config();

exports.seed = async () => {
  try {
    await mongoose.connect(process.env.TEST_DATABASE_URL);
    await User.collection.drop();
    await User.insertMany(testUsers);
  } catch (err) {
    console.log(err);
  }
}




