const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const app = express();

const songsRoutes = require('./api/routes/songs')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 
                `mongodb://localhost:27017/mi-ritmo`, 
                {
                    useNewUrlParser :true,
                    useUnifiedTopology: true
                });

app.use(bodyParse.json());

/**************************************
 * CORS handling
 *************************************/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        return res.status(200).json({});
    };
    next();
})

app.use('/songs', songsRoutes);

/********************
 * Error handling
 *******************/

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 5000);
    res.json({
        error: {
            message: error.message
        }
    });
});

