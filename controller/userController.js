const { fetchAllUsers } = require("../models/userModel")

exports.getAllUsers = (req, res, next) => {
    fetchAllUsers().then((data) => {
        res.status(200).send(data)
    })
}