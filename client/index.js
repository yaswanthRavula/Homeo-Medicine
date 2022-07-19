const express= require('express');
const path=require("path");
const app=express();
app.use(express.static(__dirname+'/dist/client/'))
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
app.use(bodyParser.json());
app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname,'dist/client','index.html'))
})
app.listen((process.env.PORT || 3000),()=>{console.log("Backend Server Listening at 3000 Port")});
mongoose.connect("mongodb+srv://yaswanth07:Yy8309328761@cluster0.fgrp3.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("MongoDb Connected"));
const PatientRouter=require('./controller/PatientController');
app.use('/HomeoMedicine/patients',PatientRouter);