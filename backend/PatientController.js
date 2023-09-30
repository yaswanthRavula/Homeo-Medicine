const mongoose=require('mongoose');
const express=require('express');
const router= express.Router();
const PatientSchema=require('./PatientSchema');
router.get("/", async (req,res)=>{
    
    try{
     console.log("Get called")
     const data= await PatientSchema.find().skip(100);
     res.send(data);
    }catch(err){
        res.send("Error From Backend Server : "+err);
    }
})


router.post("/", async (req,res)=>{
    try{
    const data=new PatientSchema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age:req.body.age,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        joinedDate:req.body.joinedDate,
        description: req.body.description,
        city:req.body.city,  
        comment:req.body.comment,
    })
    console.log("hoii");
    await data.save();
    res.send(true);
    }
    catch(exception){
        console.log(exception)
    }
})

router.put("/:id", async (req,res)=>{
  
    try{
    let pat= new PatientSchema;
    pat=await PatientSchema.findById(req.params.id);
    pat.firstname= req.body.firstname,
    pat.lastname= req.body.lastname,
    pat.age=req.body.age,
    pat.gender= req.body.gender,
    pat.phoneNumber= req.body.phoneNumber,
    pat.comment=req.body.comment;
    pat.city=req.body.city;
    pat.description=req.body.description;
    console.log(pat.description)
    await pat.save();
    res.send(true);
    }catch(exception){
        console.log("The server Exception is : "+exception)
    }  
})
router.post("/deleteIds",async (req,res)=>{
    try{
        console.log("Entering delete by Ids");
        console.log(req.body);
        result = await PatientSchema.deleteMany({_id:{$in:req.body}});
        console.log(result);
        res.send(true);
       }catch(err){
        
           res.send("Error From Backend Server : "+err);
       }
})


router.delete("/:id",async(req, res)=>{
    try{
        result=await PatientSchema.findByIdAndDelete(req.params.id);
        console.log(req.params.id)
        res.send(true);
    }catch(Exception){
        res.send("Index.js Error: "+Exception)
    }

})
router.get("/initial",async(req,res)=>{
    try{
       const data= await PatientSchema.find().limit(100);
        res.send(data);
       }catch(err){
           res.send("Error From Backend Server : "+err);
       }
})

router.get("/irregular", async(req,res)=>{
    try{
        const data= await PatientSchema.find();
        res.send(data);
       }catch(err){
           res.send("Error From Backend Server : "+err);
       }
})
module.exports=router;

