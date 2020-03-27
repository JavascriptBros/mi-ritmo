const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Song = require('../models/song');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET All songs'
    })
})

router.get('/:songId', (req, res, next) => {
    res.status(200).json({
        message: 'GET song with id:' + req.params.songId
    })
})

router.post('/', (req, res, next) => {
    const song = {
        title: req.body.title,
        artist: req.body.artist
    };
    if(song){
        res.status(201).json({
            message: 'GET song with id:' + req.params.songId,
            createdSong: song
        })
    }
})

module.exports = router;