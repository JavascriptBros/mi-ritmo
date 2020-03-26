const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const app = express();

const songsRoutes = require('./api/routes/songs')

const PORT = process.env.PORT || 5000;

// mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/mi-ritmo`);

app.use(bodyParse.json());

app.use('/songs', songsRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});