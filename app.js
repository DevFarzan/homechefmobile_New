var express     = require('express'),
    app         = express(),
    config      = require('.//config/config'),
    bodyParser  = require('body-parser'),
    glob        = require('glob'),
    mongoose    = require('mongoose'),
    server      = app.listen(config.port),
    io          = require('socket.io').listen(server);

//Connecting database

var configDB = require('./config/database.js');
mongoose.connect(configDB.EvenNodeDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection failed:'));
db.once('open', function (callback) {
    console.log("Database :: homechef :: connection established successfully.");
});

//Connecting Schemas
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (models) {
    require(models);
});
//require('./config/passport');

require('./config/express')(app, config);
require('./config/passport');

//var deleteAppoint = require('./app/controllers/deletePreviousAppointments.js');

/*io.on('connection', function (socket) {

    //When User Connected
    console.log('USER connected' + socket.id);

    socket.on('device_active', function(onlineData) {

        console.log("++++++ NOW SERVING +++++");
        console.log("--------- " + onlineData.nowServing + "----------");

        io.sockets.emit('device_active', {
            clinicID: onlineData.clinicID,
            doctorID : onlineData.doctorID,
            nowServing : onlineData.nowServing,
            inWaiting : onlineData.inWaiting,
            dateTime : new Date(),
            code : 200
        });
    });

// when the user disconnects.. perform this
    socket.on('disconnect', function () {

        console.info('Doctor disconnected (ID=' + socket.id + ').');

    });

    socket.on('appointmentAdded', function (data) {
        console.info('Appointment added of patient : ' + data.PatientFirstName + ' ' + data.PatientLastName);

        io.sockets.emit('appointmentAdded', {
            ClinicID:data.ClinicID,
            MobileID : data.MobileID,
            DoctorID: data.DoctorID,
            PatientFirstName : data.PatientFirstName,
            PatientLastName :  data.PatientLastName,
            PatientAge :  data.PatientAge,
            Gender : data.Gender,
            DoctorName : data.DoctorName,
            ClinicName : data.ClinicName,
            Maker : data.Maker,
            AppointmentNumber : data.AppointmentNumber
        });
    });


});*/
/*var interval = setInterval(function() {

    var date = new Date();
    var hours = ((date.getHours() + 11) % 12 + 1);
    var suffix = hours >= 12 ? "AM":"PM";
    hours = ((hours + 11) % 12 + 1) + suffix;
    console.log(hours);
}, 3600000);*/ //3600000


//app.listen(config.port);

console.log('Server is running at ' + config.port);
