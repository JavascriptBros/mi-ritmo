const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Song = require("../models/song");

router.get("/", (req, res, next) => {
  Song.find()
    .select("title artist _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        songs: docs.map(doc => {
          return {
            title: doc.title,
            artist: doc.artist,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/songs/" + doc._id
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

router.get("/:songId", (req, res, next) => {
  const id = req.params.songId;
  Song.findById(id)
    .select("title artist _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          song: doc,
          request: {
            type: "GET",
            url: "http://localhost:5000/songs"
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
  const song = new Song({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    artist: req.body.artist
  });

  if (song) {
    song
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created song successfully!",
          createdSong: {
            title: result.title,
            artist: result.artist,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/songs/" + result._id
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

router.put("/:songId", (req, res, next) => {
  const id = req.params.songId;
  const userParams = {};
  for (const params of req.body) {
    userParams[params.propName] = params.value;
  }
  Song.findByIdAndUpdate(id, { $set: userParams })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Song updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/songs/" + id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:songId", (req, res, next) => {
  const id = req.params.songId;

  Song.findByIdAndDelete(id)
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Song deleted",
        request: {
          type: "GET",
          url: "http://localhost:5000/songs/"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
