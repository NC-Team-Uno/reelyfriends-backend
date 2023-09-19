const { fetchAllUsers, fetchUserByUsername } = require("../models/userModel")

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
    const {user} = req.body
    console.log(user);
}