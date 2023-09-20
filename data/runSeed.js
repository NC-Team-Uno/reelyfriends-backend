const devData = require("../data/devData/users");
const { seed } = require("../data/seed");
const mongoose = require("mongoose");
require("dotenv").config();

const runSeed = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  return seed(devData).then(() => mongoose.connection.close());
};

runSeed();
