var mongoose = require('mongoose');
  

var FbUserINfo = new mongoose.Schema({
    name:String,
    first_name:String,
    mobile:String,
    picture:String,
    InsertedDate:Array,
    email:String
})
mongoose.model('FbUserINfo', FbUserINfo);