const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Playlist = require("../models/playlist");

router.get("/", (req, res, next) => {
  Playlist.find()
    .select("title songs _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        playlists: docs.map(doc => {
          return {
            title: doc.title,
            songs: doc.songs,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/playlists/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:playlistId", (req, res, next) => {
  const id = req.params.playlistId;
  Playlist.findById(id)
    .select("title songs _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          playlist: doc,
          request: {
            type: "GET",
            url: "http://localhost:5000/playlists"
          }
        });
      } else {
        res.status(404).json({ message: "Provided ID was not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const playlist = new Playlist({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    songs: req.body.songs
  });

  if (playlist) {
    playlist
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created playlist successfully!",
          createdPlaylist: {
            title: result.title,
            songs: result.songs,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/playlists/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
});

module.exports = router;
