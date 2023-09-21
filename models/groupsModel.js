const { Group } = require("../schemas/groupSchema")

exports.fetchAllGroups = async () => {
   const groups = await Group.find()
   return groups
}

exports.fetchGroup = async (group) => {
    const groupToReturn = await Group.find(group)
    return groupToReturn
}

exports.addGroup = async (newGroup) => {
    const groupToAdd = new Group(newGroup)
    return groupToAdd.save()
}

exports.updateGroup = async (name, property) => {
    const updatedGroup = await Group.findOneAndUpdate(name, property, {new: true})
    if (updatedGroup === null) {
        return Promise.reject({status: 404, message: 'Not Found'})
    }
    return updatedGroup
}

exports.removeGroup = async (name) => {
    const result = await Group.deleteOne(name)
    if (result.deletedCount === 0) {
        return Promise.reject({status: 404, message: 'Not Found'})
    }
    return result
}