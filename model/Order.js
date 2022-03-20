const mongoose = require('mongoose');
const { schema } = require('./User');
const {Schema} = mongoose;


const Items = new Schema({
    productName:{type:String,products:["shirts","T-shirts","trousers","jeans","boxers","joggers","others"]},
    washType:{type:String,actions:["wash","iron","towel","bleach"]}
})

const OrderSchema = new Schema({
    userId :  {type:Schema.Types.ObjectId,ref:'User'},
    status : {type:String,enum:["read to pickup","processing","delivered"]},
    date : {type:Date,default:Date.now},

    items : [Items],

    totalPrices : Number,
    totalItems : Number,
    orderStatus :  {type:String},
    storeLocation :  {type:String,require:true},
    totalPrice :  {type:Number},

    

});


module.exports =User;