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
// mongoose.connect('mongodb://appu:appu505@cluster0-shard-00-00.aexiq.mongodb.net:27017,cluster0-shard-00-01.aexiq.mongodb.net:27017,cluster0-shard-00-02.aexiq.mongodb.net:27017/LaundryDatabase?ssl=true&replicaSet=atlas-x21vfb-shard-0&authSource=admin&retryWrites=true&w=majority');
 

var cors = require('cors')

const SECRET = "laundryproject";
const app = express();      
app.use(cors())    
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({ extended: true }));    



app.use("/order", (req, res, next) =>{
    var token = req.headers.authorization.split("Bearer ")[1];
    // var token = req.headers.authorization;
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


app.listen(5000,()=>console.log('server is running'))