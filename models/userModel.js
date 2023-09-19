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

exports.addUser = async (newUser) => {
const userToAdd = new User(newUser)
  try {
    return userToAdd.save() 
  } catch (error) {
    error = error
  }
}

exports.updateUser = async (username, propertyToUpdate) => {
  const updatedUserDocument = await User.findOneAndUpdate(username, propertyToUpdate, {
    new: true
  })
  return updatedUserDocument
}

exports.removeUser = (username) => {
  return User.deleteOne(username)
}
  