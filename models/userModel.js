const { User } = require("../schemas/userSchemas");

exports.fetchAllUsers = () => {
  return User.find()
}