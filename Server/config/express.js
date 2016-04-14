var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

//if ('development' == env) {
    app.set('views', config.rootPath + '/Server/Views');
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/Public',
            compile: compile
        }));
    app.use(express.static(config.rootPath + '/Public'));
//}
}