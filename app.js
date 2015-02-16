// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var config = require('./oauth.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var NuweStrategy = require('passport-nuwe').Strategy;

// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

// config
passport.use(new FacebookStrategy({
 clientID: config.facebook.clientID,
 clientSecret: config.facebook.clientSecret,
 callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));

passport.use(new GithubStrategy({
 clientID: config.github.clientID,
 clientSecret: config.github.clientSecret,
 callbackURL: config.github.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));

passport.use(new NuweStrategy({
 clientID: config.nuwe.clientID,
 clientSecret: config.nuwe.clientSecret,
 callbackURL: config.nuwe.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));

// global config
var app = express();
app.configure(function() {
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
});

// env config
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.get('/account', ensureAuthenticated, function(req, res){
res.render('account', { user: req.user });
});

app.get('/', function(req, res){
res.render('login', { user: req.user });
});

app.get('/auth/facebook',
passport.authenticate('facebook'),
function(req, res){
});
app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
 res.redirect('/account');
});
app.get('/auth/github',
passport.authenticate('github'),
function(req, res){
});
app.get('/auth/github/callback',
passport.authenticate('github', { failureRedirect: '/' }),
function(req, res) {
 res.redirect('/account');
});
app.get('/auth/nuwe',
passport.authenticate('nuwe'),
function(req, res){
});
app.get('/auth/nuwe/callback',
passport.authenticate('nuwe', { failureRedirect: '/' }),
function(req, res) {
 res.redirect('/account');
});
app.get('/logout', function(req, res){
req.logout();
res.redirect('/');
});



// port
app.listen(1337);

// test authentication
function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}