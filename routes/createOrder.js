const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { body, param, validationResult } = require('express-validator');



router.use(bodyParser.urlencoded({extended:true}));

router.use(bodyParser.json())

const typesOfProduct = [
    {
        "shirtImage":"../imgs/shirts.png",
        "product":"Shirts",
        "description":"Laundered shirts are treated for stains and put into our washers",
        "washType":["washing","ironing","towel","bleach"]

    }
]