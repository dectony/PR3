var mongoose = require('mongoose'),
    crypto = require('crypto');

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
            return hashPassword(this.salt, passwordToMatch) === this.hashed_password;
        }
    }

    var User = mongoose.model('User', userSchema);

    //default init
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt, hash;
            salt = createSalt();
            hash = hashPassword(salt, 'dec');
            User.create({firstName: 'Anton',lastName:'Zasenka', userName:'dec', salt: salt, hashed_password: hash, roles:['admin']});
            salt = createSalt();
            hash = hashPassword(salt, 'hex');
            User.create({firstName: 'Alex',lastName:'Zasenka', userName:'hex', salt: salt, hashed_password: hash, roles: []});
            salt = createSalt();
            hash = hashPassword(salt, 'ber');
            User.create({firstName: 'Irene',lastName:'Zasenka', userName:'ber', salt: salt, hashed_password: hash});
        }
    })

    function createSalt(){
        return crypto.randomBytes(128).toString('base64');
    };

    function hashPassword(salt, password){
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    };
}