const express = require('express');

const morgan = require('morgan');

const connectDB = require('./auth/db/connection');

const app = express();

connectDB();

app.use(express.urlencoded({extended : false}));

app.use(express.json());

app.use(morgan('dev'));

app.use('/user', require('./auth/api/routes/User'));

module.exports = app;