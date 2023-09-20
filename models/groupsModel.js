const { Group } = require("../schemas/groupSchema")

exports.fetchAllGroups = async () => {
   const groups = await Group.find()
   return groups
}

exports.fetchGroup = async (group) => {
    const groupToReturn = await Group.find(group)
    return groupToReturn
}