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
    return userToAdd.save() 
}

exports.updateUser = async (username, propertyToUpdate) => {

  const updatedUserDocument = await User.findOneAndUpdate(username, propertyToUpdate, {
    new: true
  })

   if(updatedUserDocument===null){
    return Promise.reject({
      status:404, message: 'Not Found'
    })
   }

  return updatedUserDocument
}

exports.removeUser = async (username) => {
const result= await User.deleteOne(username)
if (result.deletedCount === 0) {
  return Promise.reject({
    status: 404,
    message: "Not Found",
  });
}
return result
}
  