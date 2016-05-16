var mongoose = require('mongoose'),
    auth = require('./auth'),
    users = require('../controllers/users'),
    cars = require('../controllers/cars'),
    auctions = require('../controllers/auctions'),
    User = mongoose.model('User');

module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        console.log(req.params);
        res.render('../../Public/app/' + req.params[0])
    });

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

    app.post('/api/users', users.createUser);


    app.get('/api/cars', cars.getCars);
    app.get('/api/cars/:id', cars.getCarById);
    app.post('/api/cars', cars.addCar);
    app.put('/api/cars/:id', cars.updateCar);
    app.delete('/api/cars/:id', cars.deleteCar);

    app.get('/api/auctions', auctions.getAuctions);
    app.get('/api/auctions/:id', auctions.getAuctionById);
    app.post('/api/auctions', auctions.addAuction);
    app.put('/api/auctions/:id', auctions.updateAuction);
    app.delete('/api/auctions/:id', auctions.deleteAuction);

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    })

    app.get('/', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}