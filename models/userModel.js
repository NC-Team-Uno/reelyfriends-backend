const { User } = require("../schemas/userSchemas");

exports.fetchAllUsers = () => {
  return User.find()
}

exports.fetchUserByUsername = async (username) => {
const user = await User.find({ username: `${username}`})

if(user.length === 0){
  return Promise.reject({
    status: 404,
    message: 'Not Found'
  })
}else return user
}
  