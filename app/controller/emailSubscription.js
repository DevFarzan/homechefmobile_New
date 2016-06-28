var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    userMobileFormData = mongoose.model('UserFormData');

module.exports = function(app){
    app.use('/', router);
}

router.post('/emailForMobileData',function(req,res,next){
    
       var dishname =          req.body.dishname;
       var   dishquantity =    req.body.dishquantity;
       var dishcomments =      req.body.dishcomments;
       var dishquantitynumber =req.body.dishquantitynumber;
       var dishdate =          req.body.dishdate;
        var curDate = new Date(dishdate);
         var days = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];
         var tempDate = curDate.getDate() + "-" + (curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : (curDate.getMonth() + 1) ) + "-" + curDate.getFullYear();
         console.log(tempDate);

       var  dishprice = req.body.dishprice;
       var  dishtime =  req.body.dishtime;
       var dishTime = new  Date(dishtime);
        var tempDishTime = dishTime.getHours()+":"+dishTime.getMinutes();
       var  servepeople = req.body.servepeople;

    var transporter = nodemailer.createTransport("SMTP", {

        /*auth: {
            user: "homechef.pakistan@gmail.com",
             pass: "2keyword"
        }*/
            host: 'harrier.websitewelcome.com', // hostname
             secureConnection: true, // use SSL
             port: 465, // port for secure SMTP
             transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
             auth: {
             user: 'info@homechef.pk',
             pass: '1keyword'
             }

    })
    //var emailListOFSubscriber = emailReciever,footerEmailAddress
    var mailOptions = {
        from: '"info@homechef.pk" <info@homechef.pk>', // sender address
        to: 'farzan.nti@gmail.com', // list of receivers
        subject: 'Welcome to HomeChef Beta! Order Delicious Homemade Food Now! ', // Subject line
        html:"<html>"+
        "<div id='con' style='width:700px;margin-left: 43px'>"+
        "<center><img src='http://homechef.pk/image/home-chef-logo.png' width='' alt='Welcome to HomeChef' title='HomeChef'></center> <br>"+
            "<div style='background-color:#f5f5f5;height:600px;'>"+
            "<div style='color: rgba(128, 128, 128, 0);'>sdsadsadsadasdasd</div>"+
            "<div style='background-color: #9fde26; width: 56%; margin-left: 167px; height: 32px; border-radius: 7px;'>"+
            "<p style='color: white; text-align: center;padding: 6px;font-family: sans-serif'>New customer request from HomeChef mobile app</p>"+
            "</div>"+
           "<div style='margin-top: 20px;margin-left:70px;text-decoration:underline;font-size: 16px;'>"+
          "<span style='font-family: sans-serif;'>A new request has been submitted by a foodie through HomeChef mobile app.</span>"+
           "<span style='font-family: sans-serif'>The requested dish details are as below:</span>"+
           "</div>"+
            " <div  style='margin-top:92px;'>"+
            "<span style='margin-left: 16px;font-family: sans-serif;font-size: 15px;font-weight: bold;color:black;'>1.Type of dish requested:</span>"+
            "<span style='margin-left:20px;font-family: sans-serif;color: black;'>Main dish</span>"+
            "</div>"+
            "<div  style='margin-top: 8px;'>"+
            "<span style='margin-left: 16px;font-family: sans-serif;font-size: 15px;font-weight: bold;color: black;'><b>2.Name of dish requested:</b></span>"+
            "<span style='margin-left:12px;font-family: sans-serif;color: black;'>"+dishname+"</span>"+
            " </div>"+
            "<div  style='margin-top: 8px;'>"+
            "<span style='margin-left: 16px;font-family: sans-serif;font-size: 15px;font-weight: bold;color: black;'<b>3.Serving people:</b></span>"+
            "<span style='margin-left:72px;font-family: sans-serif;color: black;'>"+servepeople+"</span>"+
           "</div>"+
            "<div style='margin-top: 8px;'>"+
            "<span style='margin-left: 16px;font-family: sans-serif;font-size: 15px;font-weight: bold;color: black;'><b>4.Dish quantity:</b></span>"+
            "<span style='margin-left:80px;font-family: sans-serif;color: black;'>"+dishquantity+dishquantitynumber+"</span>"+
            "</div>"+
            "<div  style='margin-top: 8px;'>"+
            "<span style='margin-left: 16px;font-family: sans-serif;font-size: 15px;font-weight: bold;color: black;'><b>5.Date requested for dish:</b></span>"+
            "<span style='margin-left:14px;font-family: sans-serif;'>"+tempDate+"</span>"+
            "</div>"+
            "<div style='margin-top: 8px;'>"+
             "<span style='margin-left: 16px;font-family: sans-serif;font-size: 15px;font-weight: bold;'><b>6.Time requested for Dish: </b></span>"+
            "<span style='margin-left:9px;font-family: sans-serif'> "+tempDishTime+"</span>"+
           "</div>"+
            "<div style='margin-top: 8px;'>"+
           "<span style='margin-left: 16px;font-family: sans-serif;font-size: 15px;font-weight: bold;'><b>7.Price range for  dish: </b></span>"+
           "<span style='margin-left:36px;font-family: sans-serif;'>"+dishprice+" RS</span>"+
            "</div>"+
            "<div  style='margin-top: 8px;'>"+
            "<span style='margin-left: 16px;font-family: sans-serif;font-size: 15px;font-weight: bold;'><b>8.Addtional comments: </b></span>"+
           "<span style='margin-left:31px;font-family: sans-serif;'> "+dishcomments+"</span>"+
          "</div>"+
            "</div>"+
            "<div style='width: 262px'>"+
            "<img src='http://res.cloudinary.com/dxk0bmtei/image/upload/v1461826070/icon_znxfsa.png' style='width: 64px;margin-left: 201px;'>"+
            "</div>"+
            "<div style='margin-left:266px;'>"+
            "<a href='http://beta.homechef.pk/' title='HomeChef website' target='blank' style='color: gray;text-decoration: none;'>beta.HomeChef.pk</a>"+
            "</div>"+
            "</div>"+
           "</html>"



    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        } else {
            console.log('email sent')

            // After send confirmation to your client, then send alert to your admin so that they can
            // know this person subscribe your service.

            if(error) {
                res.send(500);
            } else {
                res.send(200);
            }
        }

    });
})