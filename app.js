const createError = require('http-errors');
const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const methodOverride = require('method-override');
const userMiddleWare = require('./middleware');

const indexRouter = require('./routes/index');
const partyRouter = require('./routes/party');
const authenticationRouter = require('./routes/authentication');
const userRouter = require('./routes/user');

const app = express();
userMiddleWare(app);

app.use(function (req, res, next) {
  res.locals.isAuth = !!req.session.user;
  if (req.session.user) {
    res.locals.userName = req.session.user.username;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/party', partyRouter);
app.use('/', authenticationRouter);


module.exports = app;
