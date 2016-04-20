var mongoose = mongoose = require('mongoose');

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
        userName: String
    });

    var User = mongoose.model('User', userSchema);

    //default init
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create(
                {firstName: 'Anton',lastName:'Zasenka', userName:'dec'},
                {firstName: 'Alex',lastName:'Zasenka', userName:'hex'},
                {firstName: 'Irene',lastName:'Zasenka', userName:'ber'})
        }
    })
}