var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(
    new LocalStrategy(
      {
        usernameField: 'mobileNumber',
        passwordField: 'Password',
      },
      function(mobileNumber, Password, done) {

        console.log( mobileNumber , Password);

        User.findOne({ mobile: mobileNumber }, function (err, user) {
           console.log("User.findOne: " , err );
          if (err) { 
            console.log(" err " , err );
            return done(err); 
          }
          if (!user) {
            console.log(" !user:  " , user );
            return done(null, false, { message: 'The mobile number or password you entered is incorrect. Please try again (check caps lock).' });
          }
          if (!user.validPassword(Password)) {
            console.log("  user.validPassword :  " , Password);
            return done(null, false, { message: 'The mobile number or password you entered is incorrect. Please try again (check caps lock).' });
          }
          
          return done(null, user);

        });
    }
));