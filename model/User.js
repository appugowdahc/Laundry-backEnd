const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name :  {type:String,require:true},
    email :  {type:String,unique:true,require:true},
    password :  {type:String,require:true,min:8},
    phone :  {type:Number,require:true,length:10},
    state :  {type:String,require:true},
    district :  {type:String,require:true},
    Address :  {type:String,require:true},
    pincode :  {type:Number,require:true,length:6}

});

const User = mongoose.model('User',UserSchema);

module.exports = User;