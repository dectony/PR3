var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption')

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('PR3 db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_password: String,
        roles: [String]
    });

    userSchema.methods = {
        Authenticated: function(passwordToMatch){
            return encryption.hashPassword(this.salt, passwordToMatch) === this.hashed_password;
        }
    }

    var User = mongoose.model('User', userSchema);

    //default init
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt, hash;
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'dec');
            User.create({firstName: 'Anton',lastName:'Zasenka', userName:'dec', salt: salt, hashed_password: hash, roles:['admin']});
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'hex');
            User.create({firstName: 'Alex',lastName:'Zasenka', userName:'hex', salt: salt, hashed_password: hash, roles: []});
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'ber');
            User.create({firstName: 'Irene',lastName:'Zasenka', userName:'ber', salt: salt, hashed_password: hash});
        }
    })
}