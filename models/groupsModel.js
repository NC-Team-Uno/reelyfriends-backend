const { Group } = require("../schemas/groupSchema");
const { fetchUserByUsername } = require("./userModel");

exports.fetchAllGroups = async () => {
  const groups = await Group.find();
  return groups;
};

exports.fetchGroup = async (group) => {
  const groupToReturn = await Group.find(group);
  if (groupToReturn.length === 0) {
    return Promise.reject({ status: 404, message: "Not Found" });
  }
  return groupToReturn;
};

exports.addGroup = async (newGroup) => {
  let preferences = [];
  let streamingServices = [];
  let likedFilms = [];
  const { members } = newGroup;
  for (member of members) {
    const user = await fetchUserByUsername(member);
    preferences.push(...user[0].preferences);
    streamingServices.push(...user[0].streamingServices);
    likedFilms.push(...user[0].likedFilms);
  }
  preferences = [...new Set(preferences)];
  streamingServices = [...new Set(streamingServices)];
  likedFilms = [...new Set(likedFilms)];

  const populatedGroup = {
    ...newGroup,
    streamingServices: streamingServices,
    likedFilms: likedFilms,
    preferences: preferences,
  };

  const groupToAdd = new Group(populatedGroup);
  return groupToAdd.save();
};

exports.updateGroup = async (name, property) => {
  const updatedGroup = await Group.findOneAndUpdate(name, property, {
    new: true,
  });
  if (updatedGroup === null) {
    return Promise.reject({ status: 404, message: "Not Found" });
  }
  return updatedGroup;
};

exports.removeGroup = async (name) => {
  const result = await Group.deleteOne(name);
  if (result.deletedCount === 0) {
    return Promise.reject({ status: 404, message: "Not Found" });
  }
  return result;
};
