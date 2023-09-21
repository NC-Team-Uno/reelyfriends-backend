const { fetchAllGroups, fetchGroup, addGroup, updateGroup, removeGroup } = require("../models/groupsModel")


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

exports.postGroup = (req, res, next) => {
    const newGroup = req.body
    addGroup(newGroup).then((data) => {
        res.status(201).send({addedGroup: data})
    })
}

exports.patchGroup = (req, res, next) => {
    const name = req.params
    const property = req.body
    updateGroup(name, property).then((data) => {
        res.status(200).send(data)
    }).catch(next)
}

exports.deleteGroup = (req, res, next) => {
    const name = req.params
    removeGroup(name).then(() => {
        res.status(204).send()
    }).catch(next)
}