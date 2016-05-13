var mongoose = require('mongoose'),
    auth = require('./auth'),
    User = mongoose.model('User');

module.exports = function(app){
    app.get('/partials/*', function(req,res){
        console.log(req.params);
        res.render('../../Public/app/'+req.params[0])
    });

    app.get('/api/users', auth.requiresRole('admin'), function(req,res){
        User.find({}).exec(function(err, collection){
            console.log(collection);
            res.send(collection);
        })
    })
    app.post('/login', auth.authenticate)

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    })

    app.get('*', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}