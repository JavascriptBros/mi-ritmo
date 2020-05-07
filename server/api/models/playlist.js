const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  songs: Array
});

module.exports = mongoose.model("Playlist", playlistSchema);
