var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

var env = process.env.NODE_ENV || 'development';
//if ('development' == env) {
    app.set('views', __dirname + '/Server/Views');
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(stylus.middleware(
        {
            src: __dirname + '/Public',
            compile: compile
        }));
    app.use(express.static(__dirname + '/Public'));
//}


if(env == 'development'){
    mongoose.connect('mongodb://localhost/PR3');
}
else{
    mongoose.connect('mongodb://dectony:5145muZZle.pr3@ds015869.mlab.com:15869/pr3');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error...'));
db.once('open', function callback(){
    console.log('PR3 db opened');
});

var messageSchema = mongoose.Schema({message:String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req,res){
    res.render('partials/'+req.params.partialPath)
});
app.get('*', function(req, res){
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port' + port + '...');

