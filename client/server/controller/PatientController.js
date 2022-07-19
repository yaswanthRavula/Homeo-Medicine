const mongoose=require('mongoose');
const express=require('express');
const router= express.Router();
const PatientSchema=require('../model/PatientSchema');
router.get("/", async (req,res)=>{
    try{
     const data= await PatientSchema.find();
     res.send(data);
    }catch(err){
        res.send("Error From Backend Server : "+err);
    }
})


router.post("/", async (req,res)=>{
    const data=new PatientSchema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age:req.body.age,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        joinedDate:req.body.joinedDate,
        description: req.body.description,
    })
    await data.save();
    res.send(true);
})

router.put("/:id", async (req,res)=>{
    try{
    let pat= new PatientSchema;
    pat=await PatientSchema.findById(req.params.id);
    pat.description=req.body.description;
    await pat.save();
    res.send(true);
    }catch(exception){
        console.log("The server Exception is : "+exception)
    }  
})
module.exports=router;