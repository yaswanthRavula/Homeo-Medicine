const express= require('express');
const path=require("path");
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
app.use(bodyParser.json());



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
  });

app.listen((process.env.PORT || 3000),()=>{console.log("Backend Server Listening at 3000 Port")});
mongoose.connect("mongodb+srv://yaswanth07:Yy8309328761@cluster0.fgrp3.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("MongoDb Connected"));
const PatientRouter=require('./controller/PatientController');
app.use('/HomeoMedicine/patients',PatientRouter);