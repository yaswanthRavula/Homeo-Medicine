const express= require('express');
const path=require('path');
const app=express();
app.use(express.static(__dirname+'/dist/client/'))
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
app.use(cors())
app.use(bodyParser.json());
app.get('/', (req,res)=>{
    res.sendFile(path.join('/dist/client/index.html'))
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.listen((process.env.PORT || 3000),()=>{console.log("Backend Server Listening at 3000 Port")});
mongoose.connect("mongodb+srv://yaswanth07:Yy8309328761@cluster0.fgrp3.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("MongoDb Connected"));
const PatientRouter=require('./controller/PatientController');
app.use('/HomeoMedicine/patients',PatientRouter);