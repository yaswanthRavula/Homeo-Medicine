const mongoose= require('mongoose');
const DescriptionSchema=require('./DescriptionSchema')
const PatientSchema = new mongoose.Schema([
    {firstname: String},
    {lastname: String},
    {age: Number},
    {gender: String},
    {phoneNumber: Number},
    {joinedDate: Date},
    {description: [DescriptionSchema]}

]);
module.exports= mongoose.model("Patient", PatientSchema);