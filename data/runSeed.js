const users = require("../data/devData/users");
const groups = require("../data/devData/groups")
const { seed } = require("../data/seed");
const mongoose = require("mongoose");
require("dotenv").config();

const runSeed = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  return seed(users, groups).then(() => mongoose.connection.close());
};

runSeed();
