var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

//if ('development' == env) {
    app.set('views', config.rootPath + '/Server/Views');
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()) // parse application/json
    app.use(session({secret: 'pr3 unicorns'}));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/Public',
            compile: compile
        }));
    app.use(express.static(config.rootPath + '/Public'));
//}
}
