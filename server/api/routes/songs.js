const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const controllers = require("../controllers/songsController");

const Song = require("../models/song");

router.get("/", controllers.getMany);

router.get("/:id", controllers.getOne);

router.post("/", checkAuth, controllers.createOne);

router.put("/:id", controllers.updateOne);

router.delete("/:id", controllers.deleteOne);

module.exports = router;
