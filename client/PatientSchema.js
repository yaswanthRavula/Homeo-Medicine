const mongoose= require('mongoose');
const DescriptionSchema=require('./DescriptionSchema')
const PatientSchema = new mongoose.Schema([
    {firstname: String},
    {lastname: String},
    {age: Number},
    {gender: String},
    {phoneNumber: Number},
    {comment: String},
    {city:String},
    {joinedDate: Date},
    {description: [DescriptionSchema]}

]);
module.exports= mongoose.model("Patient", PatientSchema);