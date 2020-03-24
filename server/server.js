const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

// mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/mi-ritmo`);

app.use(bodyParse.json());

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works'
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});