const express = require("express");
const mongoose = require('mongoose')
const {Schema} = mongoose;
const router = express.Router();
const Order = require('../model/Order');
const User = require('../model/User')
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const { body, params, validationResult } = require('express-validator');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride('_method'))
router.use(bodyParser.urlencoded({extended:true}));

router.use(bodyParser.json());
// for getting user pastOrders by user id
router.get("/order/:id", async (req, res) =>{
    try{
        const user = req.params.id
    console.log(user)

    const orders = await Order.find({user:user});
    
    res.json({
        status: "success foam",
        orders
    })
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
});
//for tracking particular order by o
router.get("/order/:id", async (req, res) =>{
    const orderId = req.params.id
    console.log(orderId)

    const orders = await Order.findOne({_id:rderId},{user:req.id});
    res.json({
        status: "success foam",
        orders
    });
});


router.get('/products', async(req,res)=>{
    
        // strict false will allow you to save document which is coming from the req.body

        const ProductCollectionSchema = new Schema({}, { strict: false })
        const ProductCollection = mongoose.model('test_collection', ProductCollectionSchema)

        let body = {product:["shirts","t-shirts","trousers","jeans","boxers","joggers","others"]}

        const testCollectionData = new ProductCollection(body)
        await testCollectionData.save()
        return res.json({
            testCollectionData
        })
    
});






router.post("/orders", async (req, res) => {
    try{
    const order = await Order.create({
        user: req.user,
        status : req.body.status,
        products : req.body.products,
        totalPrice: req.body.totalPrice,
        totalQuantity: req.body.totalQuantity
    })
    console.log(order)
    return res.status(200).json({
        status: "Order is created",
        data : order,
       
       
    })
    }   catch(e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    } 
    console.log("final:",order)  
})


router.put('/order/:id',async(req,res)=>{
    try{
        const orderId = req.params.id;

        const order = await Order.updateOne({_id:orderId},{status:"cancelled"});

    }catch(err){
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
})



module.exports = router;