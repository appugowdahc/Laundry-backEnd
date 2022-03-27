const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const { body, param, validationResult,oneOf } = require('express-validator');
const SECRET = "laundryproject";


router.use(bodyParser.urlencoded({extended:true}));

router.use(bodyParser.json());
router.post('/register',body('name'),body('email'),body('phone'),body('password'), async(req,res)=>{
    console.log(req.body)
    
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name,email,password,state,phone,district,address,pincode}  =req.body;

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
            status:"OK",
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

module.exports=router;