const mongoose=require('mongoose');
const DescriptionSchema= new mongoose.Schema([
    {doseName: String},
    {dosePower: String},
    {doseDate: Date}
])
module.exports=(DescriptionSchema);