const { User } = require("../schemas/userSchemas");
const {Group} = require('../schemas/groupSchema')

exports.seed = async (users, groups) => {
  try {
    await User.collection.drop();
    await User.insertMany(users);
    await Group.collection.drop();
    await Group.insertMany(groups)
  } catch (err) {
    console.log(err);
  }
}




