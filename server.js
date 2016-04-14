var express = require('express');


var app = express();
var env = process.env.NODE_ENV || 'development';

var config = require('./Server/config/config')[env];

require('./Server/config/express')(app, config)
require('./Server/config/mongoose')(config)

require('./Server/config/routes')(app)




//var messageSchema = mongoose.Schema({message:String});
//var Message = mongoose.model('Message', messageSchema);
//var mongoMessage;
//Message.findOne().exec(function(err, messageDoc){
//    mongoMessage = messageDoc.message;
//});





app.listen(config.port);
console.log('Listening on port' + config.port + '...');

