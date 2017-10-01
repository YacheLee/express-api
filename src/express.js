"use strict";
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const httpStatus = require("http-status");
const helmet = require("helmet");
const morgan = require('morgan');
const routes = require("./routes");
const {rest_prefix, env, session_secret} = require("./config");
const APIError = require("./errors/APIError");
const JSONError = require("./errors/JSONError");
const ValidationError = require("./errors/ValidationError");
const MongoStore = require('connect-mongo')(session);

const sessionMap = {
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    secret: session_secret,
    cookie: {
        expires : new Date(Date.now() + 2592000000),
        maxAge: 2592000000
    }
};

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/../access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(session(sessionMap));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(helmet());
app.use(cors());
app.use(rest_prefix, routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
 if (err instanceof JSONError) {
     const obj = {errorCode: err.errorCode, msg: err.msg};
     if(err.data){
         obj.data = err.data;
     }
    res.status(err.status).send(obj);
  } else if(err instanceof ValidationError){
     res.status(err.status).json(err.error);
 } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  } else {
    return next(err);
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: env === 'development' ? err.stack : {}
  })
);

module.exports = app;