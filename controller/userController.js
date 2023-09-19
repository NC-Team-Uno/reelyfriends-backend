const { fetchAllUsers, fetchUserByUsername, addUser, updateUser, removeUser } = require("../models/userModel")

exports.getAllUsers = (req, res, next) => {
    fetchAllUsers().then((data) => {
        res.status(200).send(data)
    })
}

exports.getUserByUsername = (req, res, next) => {
    const{username} = req.params
    fetchUserByUsername(username).then((data) => {
    res.status(200).send(data[0])
}).catch(next)   
}


exports.postUser = (req, res, next) => {
    const newUser = req.body
    addUser(newUser).then((data) => {
        res.status(201).send({addedUser: data})
    }).catch(next)
}

exports.patchUser = (req, res, next) => {


    const username = req.params
    const propertyToUpdate = req.body
  
    updateUser(username, propertyToUpdate).then((data) => {
        res.status(200).send(data)
    }).catch(next)
}

exports.deleteUser = async (req, res, next) => {
    const username = req.params
    removeUser(username).then((result) => {
        res.status(204).send()
    }).catch(next)

}