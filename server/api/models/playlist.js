const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  songs: [Schema.Types.Mixed],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Playlist", playlistSchema);
