const express = require('express');
// const User = require('./model/User');
// const Order = require('./model/Order');
const LoginRouter = require('./routers/login');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
mongoose.connect('mongodb+srv://appu:appu505@cluster0.aexiq.mongodb.net/LaundryDatabase?retryWrites=true&w=majority');
const secret = "laundryproject";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.json('ok')
});
app.use('laundry/v1',LoginRouter)


app.listen(3000,()=>console.log('server is running'))