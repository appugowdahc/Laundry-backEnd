const express = require("express");
const router = express.Router();
const User = require("./model/User");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { body, param, validationResult } = require('express-validator');
const secret = "laundryproject";


router.use(bodyParser.urlencoded({extended:true}));

router.use(bodyParser.json());





router.post('/laundry/v1/register',async(req,res)=>{
    console.log(req.body)
    
    try{
        const {name,email,password,state,phone,district,address,pincode}=req.body
        bcrypt.hash(password, 10, async function(err, hash) {
           
        if(err){
                res.status(400).json({
                    status: "failed",
                    message: "Invalid password"
                })
            }
        const user =await User.create(
            {
            name,email,password:hash,state,phone,district,address,pincode
        })
        res.json({
            status:suceess,
            user
        })
    })
       
    }catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

router.post('/laundry/v1/login',async(req,res)=>{
    try {
        
        const {email,Phone, password} = req.body;
        const user = await User.find({$or:[{email}, {phone}]});
        if(!user){
            res.status(401).json({
                status:"failed",
                message:"Invalid user"
            })
        }
        
        bcrypt.compare(password, user.password).then(function(result) {
            if(result){
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);
                res.json({
                    status: "sucess",
                    token
                })
            }else{
                res.status(401).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
        });
       
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }

})

module.exports = router;