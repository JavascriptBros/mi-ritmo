const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/mi-ritmo`);

app.use(bodyParse.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});