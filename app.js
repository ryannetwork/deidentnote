const config = require('./config.json')

var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var passport = require('passport');
var basicAuth = require('basic-auth');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')



var indexRouter = require('./routes/index');
//var noteRouter = require('./routes/note');
var diffRouter = require('./routes/diff');
var loginRouter = require('./routes/login');

//var usersRouter = require('./routes/users');


var app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));


var LdapStrategy = require('passport-ldapauth');
var OPTS = {
  server: {
    url: config.ldap.url,
    bindDN: config.ldap.bind.user,
    bindCredentials: config.ldap.bind.password,
    searchBase: config.ldap.root,
    searchFilter: '(cn={{username}})' 

  }
};
passport.use(new LdapStrategy(OPTS));
app.use(passport.initialize());
app.use(passport.session()); //persistent login session

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  //console.log("ID:"  + id)
  //User.findById(id, function(err, user) {
    done(null, id);
  //});
});


// Simple route middleware to ensure user is authenticated.
//  Use this route middleware on any resource that needs to be protected.  If
//  the request is authenticated (typically via a persistent login session),
//  the request will proceed.  Otherwise, the user will be redirected to the
//  login page.

app.use(function(req, res, next) { 
  res.locals.contextPath = req.headers['x-deident-name'] || "";
  return next();
})


function ensureAuthenticated(req, res, next) {
  console.log("is authenticated: " + req.isAuthenticated())

  if (req.isAuthenticated()) { 
    console.log("User: " + req.user.cn)
    return next(); 
  }
  res.redirect(res.locals.contextPath + '/login')
}

app.set('view engine', 'hbs');

//hbs.registerHelper('contextPath', function() { return "/deident" });
hbs.registerPartials(path.join(__dirname , 'views/partials') );

hbs.localsAsTemplateData(app);

app.set('view cache', false) 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tools', express.static('node_modules'))


app.use('/', indexRouter);
app.use('/diff', ensureAuthenticated, diffRouter);
app.use('/login', loginRouter);

app.post('/login', passport.authenticate('ldapauth', {
  successRedirect: './',   failureRedirect: '/login'
} ));


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
