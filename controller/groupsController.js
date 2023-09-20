const { fetchAllGroups, fetchGroup } = require("../models/groupsModel")


exports.getAllGroups = (req, res, next) => {
    fetchAllGroups().then((data) => {
        res.status(200).send(data)
    })
}

exports.getGroup = (req, res, next) => {
    const group = req.params
    fetchGroup(group).then((data) => {
        res.status(200).send(data[0])
    })
}