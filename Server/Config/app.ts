import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Database modules
import mongoose from 'mongoose';
import db from './db';

mongoose.connect(db.remoteURI);

// DB Connection Events
mongoose.connection.on('connected', function() {
    console.log(`Connected to MongoDB`)
    console.log(mongoose.connection.readyState)
});

mongoose.connection.on('error', function(err) {
    console.log(`Error in connecting ${err}`)
})

mongoose.connection.on('disconnected', function () {
    console.log(`Disconnected from MongoDB`)
});

import indexRouter from '../Routes/index';

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

export default app;
