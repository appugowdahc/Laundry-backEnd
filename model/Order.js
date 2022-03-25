// const mongoose = require('mongoose');
// const { schema } = require('./User');
// const {Schema} = mongoose;
// const Items = new Schema({
//     productType: { type: String },
//     quantity: { type: Number, default: 0 },
//     washing: { type: Boolean, default: false },
//     ironing: { type: Boolean, default: false },
//     drywash: { type: Boolean, default: false },
//     chemicalwash: { type: Boolean, default: false }
// })
// const OrderSchema = new Schema({
//     status: {type: String},
//     products: {type: [Items]},
//     totalPrice : {type: Number, default:0},
//     totalQuantity : {type: Number, default:0},
//     user: {type: mongoose.Types.ObjectId ,ref:'User'},
// });
// const Order = mongoose.model('Order',OrderSchema);


// module.exports =Order;

const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const OrderSchema= new Schema({
    date:{type: Date, default: Date.now},
    items:{type:Array, default:[]},
    user:{type:mongoose.Types.ObjectId,ref:"User"},
    status:{type:String}    
});
const Order=mongoose.model("Order",OrderSchema);
module.exports=Order;