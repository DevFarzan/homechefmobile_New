var mongoose = require('mongoose');

var userMobileFormData = new mongoose.Schema({
    dishName:String,
    dishRequest:String,
    dishQuantity:String,
    dishQuantityNumber:String,
    servePeople:String,
    requestedDate:String,
    requestedTime:String,
    requestedPriceRange:String,
    requestedComments:String
})
mongoose.model('UserFormData', userMobileFormData);