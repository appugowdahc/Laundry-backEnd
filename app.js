const express = require('express');
const User = require('./model/User');
const Order = require('./model/Order');
const LoginRouter = require('./routes/login');
const RegRouter = require('./routes/reg');
const OrderRouter = require('./routes/Orders');
var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const bodyParser=require('body-parser');
mongoose.connect('mongodb+srv://appu:appu505@cluster0.aexiq.mongodb.net/LaundryDatabase?retryWrites=true&w=majority');
const SECRET = "laundryproject";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/order", (req, res, next) =>{
    var token = req.headers.authorization.split("test ")[1];
    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "Token is missing"
        })
    }
    // verify the toke
    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err){
            return res.status(401).json({
                status:"failed",
                message: "Invalid token"
            })
        }
        req.user = decoded.data;
        next();
    });
});
app.get('',(req,res)=>{
    res.json('ok')
});

app.use('/',LoginRouter);
app.use('/',RegRouter);

app.use('/',OrderRouter)


app.listen(3000,()=>console.log('server is running'))