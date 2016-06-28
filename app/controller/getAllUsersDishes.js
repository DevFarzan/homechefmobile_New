 var express = require('express'),
     router = express.Router(),
     mongoose = require('mongoose'),
     Dish = mongoose.model('Dish'),
     Profile = mongoose.model('Profile')
     
 var async = require("async");

 module.exports = function(app){
     app.use('/', router);
 }
 
 router.get('/getAllUserDishes',function(req,res,next){
  console.log('farzan');
     Dish.find({},{__v:0},
         function(err,AllUserDishes){
             if(err){
                 res.send({
                     code:500,
                     content:'internal server error',
                     msg:'API not called properly'
                 });
             }
             else if(AllUserDishes){
                 var allDishes = [];
                
                 async.each(AllUserDishes,
                     function(record, TopCallback){

                         async.waterfall([
                             function(callback) {

                                 record.populate('user', function(err, userRecord ) {
                                     if (err) {
                                         console.log(err);
                                         callback(null, null);
                                     } else{
                                         callback(null, userRecord );
                                     }
                                 });

                             },
                             function( userRecord , callback) {

                                 if(userRecord.user !=null ){
                                     var pId = require('mongoose').Types.ObjectId;
                                     profileID = new pId(userRecord.user && userRecord.user._id );

                                     Profile.findOne( {'regisId': profileID }, function (err, profile) {
                                         if (err) {
                                             console.log(err);
                                             return res.status(400).json(  {message: 'Profile details not found.' }  );
                                         }

                                         var data =  {
                                             _id: userRecord.user._id,
                                             user: userRecord.user,
                                             dishes: userRecord.dishes,
                                             profile: profile
                                         };

                                         callback(null, data);
                                     });
                                 }else{
                                     callback(null, null);
                                 }
                             },
                             function(userData , callback) {
                                 if(userData !=null) {
                                     allDishes.push( userData );
                                 }
                                 callback(null, 'done');
                             }
                         ], function (err, result) {
                             TopCallback();
                         });

                     },function(err ){ // All tasks are done now
                         
                         res.send({
                             code:200,
                             content:allDishes,
                             msg:'all UserDishes retrieved successfully'
                         })
                     });

             }
             else {
                 res.send({
                     code:404,
                     content:'dishes not found',
                     msg:'dishes not found'

                 })
             }
         }
     )


 })