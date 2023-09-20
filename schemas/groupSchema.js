const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = Schema({
  groupAdmin: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  streamingServices: {
    type: [String],
    required: true,
  },
  preferences: {
    type: [String],
    required: true,
  },
  likedFilms: {
    type: [String],
    required: true,
  },
})

const Group = mongoose.model("Groups", groupSchema)

module.exports = {Group}

