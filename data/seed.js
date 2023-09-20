const { User } = require("../schemas/userSchemas");

exports.seed = async (data) => {
  try {
    await User.collection.drop();
    await User.insertMany(data);
  } catch (err) {
    console.log(err);
  }
}




