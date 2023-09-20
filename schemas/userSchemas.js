const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
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
  wishlist: {
    type: [String],
    required: true,
  },
  likedFilms: {
    type: [String],
    required: true,
  },
  friends: {
    type: [String],
    required: true,
  },
  watchGroups: {
    type: [String],
    required: true,
  },
});

const User = mongoose.model("testUsers", userSchema);

module.exports = { User };
