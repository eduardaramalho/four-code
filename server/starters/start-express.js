const express          = require('express');
const cors             = require('cors');
const morgan           = require('morgan');

const expressApp = express();

global.app.express = expressApp;

expressApp.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
expressApp.use(cors({
    origin: true,
    maxAge: 86400
}));