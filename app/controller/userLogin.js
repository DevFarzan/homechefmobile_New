var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //passport = require('passport'),
    Dish = mongoose.model('Dish'),
     fs = require('fs'),
    passwordHash = require('password-hash'),
    jwt = require('express-jwt'),
    Profile = mongoose.model('Profile'),
    passport = require('passport'),
    User = mongoose.model('User'),
    FbUserInfo = mongoose.model('FbUserINfo');

module.exports = function(app){
    app.use('/', router);
}

router.post('/userlogin',function(req,res,next){

   /* if(!req.body.login.mobileNumber || !req.body.login.Password){
        return res.status(400).json({message: 'The mobile number or password you entered is incorrect. Please try again (check caps lock).'});
    }

    var user = req.body;


        if (user) {
            console.log("IF user :", user);
        var phonenumber = "0"+user.login.mobileNumber
            console.log(phonenumber);
            User.find({
                mobile: phonenumber,
        }, function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({message: 'userDetail details not found.'});
                }

                //var isChef = profile.usertype && profile.usertype == "chef" ? true : false;
                return res.json({uid: user._id,data:data});

            });
        }


       /!* if(user) {
            User.find({
                mobile: user.login.mobileNumber,
            }, function (err, data) {
                res.send({
                    err: err,
                    data: data
                })
            })
        }*!/
*/
    if(!req.body.mobileNumber || !req.body.Password){
        return res.status(400).json({message: 'The mobile number or password you entered is incorrect. Please try again (check caps lock).'});
    }

    var user = req.body;

    passport.authenticate('local', function(err , user  , info){

        if(err){
         console.log(" err :" , err  );
         return next(err);
         }

        if(user){
            console.log("IF user :" , user  );

            Profile.findOne( {'regisId': user._id }, function (err, profile) {
                if (err) {
                    console.log( err );
                    return res.status(400).json(  {message: 'Profile details not found.' }  );
                }

                //var isChef = profile.usertype && profile.usertype == "chef" ? true : false;
                return res.json({user:user});

            });

        } else {
            console.log("Else user :" , user , info  );
            return res.json(info);
        }
    })(req, res, next);
})
router.post('/usersignup',function(req,res,next) {
    var curDate = new Date();
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];
    var tempDate = curDate.getDate() + "-" + (curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : (curDate.getMonth() + 1) ) + "-" + curDate.getFullYear();
    if (!req.body.signup.Name || !req.body.signup.emailAddress || !req.body.signup.phone || !req.body.signup.password) {
        return res.status(400).json({message: 'Please enter correct details.'});
    }
    User.findOne({'mobile': "0"+req.body.signup.phone}, function (err, user) {

        if (err) {
            console.log(err.name);
            return res.status(400).json({message: 'Something went wrong, please try again.'});
        }
        if (user) {
            console.log('User is already registered.');
            return res.status(400).json({message: 'User is already registered.'});
        }

        var user = new User({
            username: req.body.signup.Name,
            email: req.body.signup.emailAddress,
            pass: req.body.signup.password,
            mobile: "0" + req.body.signup.phone,
            subscribe: false,
            InsertedDate: tempDate,
            MobileData: true
        })

        user.save(function (err, data) {
            res.send({
                err: err,
                data: data
            })
        });
    });
})


router.post('/checkUserPhoneNumber',function(req,res,next){
    var userPhoneNumber = req.body.phone;
    var FbName = req.body.name;
    var Fbfirstname = req.body.firstname;
    var Fbpicture = req.body.picture;
    var email = req.body.email;


    User.find({mobile:userPhoneNumber},function(err,user){
        if(err){
            return res.status(400).json(  {message: 'users not found.' }  );
        }
       else if(user == [0]){
            res.json({message:'user not found in db'})
        }
        else{
            res.json({user:user})
        }

    })
});
router.post('/FbUserInfo',function(req,res,next){

    var curDate = new Date();
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];
    var tempDate = curDate.getDate() + "-" + (curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : (curDate.getMonth() + 1) ) + "-" + curDate.getFullYear();

    var userPhoneNumber = req.body.phone;
    var FbName = req.body.name;
    var Fbfirstname = req.body.firstname;
    var Fbpicture = req.body.picture;
    var email = req.body.email;

    var FbUser_Info = new FbUserInfo({
        name:FbName,
        first_name:Fbfirstname,
        mobile:userPhoneNumber,
        picture:Fbpicture,
        InsertedDate:tempDate,
        email:email
    });

    FbUser_Info.save(function(err,data){
        res.send({
            err:err,
            data:data
        })
    })
    
})
