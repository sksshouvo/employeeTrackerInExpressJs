var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');

// routes
var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var register_user = require('./routes/register_user');
var login_user = require('./routes/login_user');
var file_upload = require('./routes/file_upload');
var app = express();

//session
app.locals.session = require('express-session');
// mongo 
app.locals.mongo = require('mongodb'); 
// random string

app.locals.logged_in = "love";


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/login_user', login_user);
app.use('/register_user', register_user);

// default options
app.use('/upload', file_upload);


app.use('*', (req, res)=>{
res.send('404, Bad request');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
