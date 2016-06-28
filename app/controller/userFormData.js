var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Dish = mongoose.model('Dish'),
    Profile = mongoose.model('Profile'),
    userMobileFormData = mongoose.model('UserFormData');

var async = require("async");

module.exports = function(app){
    app.use('/', router);
}
router.post('/getUserFormData',function(req,res,next){
    var DishName = req.body.finalForm1Data.dishname;
    var DishRequest = req.body.finalForm1Data.dishRequest;
    var ServingPeople = req.body.finalForm1Data.servePeople;
    var DateForDish  = req.body.finalForm1Data.dishDate;
    var TimeForDish = req.body.finalForm1Data.dishTime;
    var dishQuantity = req.body.finalForm1Data.quantity;
    var dishQuantityNumber = req.body.finalForm1Data.quanityNumber;
    var dishPriceRange = req.body.finalForm2Data.priceRange;
    var dishUserComment = req.body.finalForm2Data.userComments;

    var userFormData_info = new userMobileFormData({
        dishName:DishName,
        dishRequest:DishRequest,
        dishQuantity:dishQuantity,
        dishQuantityNumber:dishQuantityNumber,
        servePeople:ServingPeople,
        requestedDate:DateForDish,
        requestedTime:TimeForDish,
        requestedPriceRange:dishPriceRange,
        requestedComments:dishUserComment
    })
    userFormData_info.save(function(err,data){
        res.send({
            err:err,
            data:data
        })
    })



})