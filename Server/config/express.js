var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');
    //passport = require('passport'),
    //localStrategy = require('passport-local').Strategy;

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

//if ('development' == env) {
    app.set('views', config.rootPath + '/Server/Views');
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(session({secret: 'pr3 unicorns'}));
    app.use(cookieParser());
    app.use(config.passport.initialize());
    app.use(config.passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/Public',
            compile: compile
        }));
    app.use(express.static(config.rootPath + '/Public'));
//}
}
