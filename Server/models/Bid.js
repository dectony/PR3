var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BidModel = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    auction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction'
    },
    bidValue: {type: Double},
    createdDate: {type: Date, default: Date.now}
});


var Auction = mongoose.model('Bid', BidModel);

module.exports.AuctionModel = BidModel;