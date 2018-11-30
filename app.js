var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
//var noteRouter = require('./routes/note');
var diffRouter = require('./routes/diff');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//app.set('view engine', 'jade');

app.set('view engine', 'hbs');

//hbs.registerHelper('contextPath', function() { return "/deident" });
hbs.registerPartials(path.join(__dirname , 'views/partials') );

hbs.localsAsTemplateData(app);

app.use(function(req, res, next) { 
	res.locals.contextPath = req.headers['x-deident-name'] || "";
	return next();
})

app.set('view cache', false) 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tools', express.static('node_modules'))


app.use('/', indexRouter);
app.use('/diff', diffRouter);

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
