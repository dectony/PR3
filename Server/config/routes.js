var mongoose = require('mongoose'),
    auth = require('./auth');

module.exports = function(app){
    app.get('/partials/*', function(req,res){
        console.log(req.params);
        res.render('../../Public/app/'+req.params[0])
    });

    app.post('/login', auth.authenticate)

    app.get('*', function(req, res){
        res.render('index');
    });
}