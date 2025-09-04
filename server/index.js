const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/stdb")
.then(()=> console.log("BIT MongoDB connected"))
.catch(err=>console.log("Connection Error:",err));
 const Person = mongoose.model( "Person", new mongoose.Schema({name:String,age: Number,email:String,department:String,phone:Number,city:String,street:String,year:Number}),"students");

 app.get("/",async(_req,res)=>{
    try{
        const people =await Person.find().sort({name:1});
        res.json(people);
    }catch(e){
       res.status(500).json({error:e.error});
    }
 });
 app.post("/",async(req,res)=>{
try{
const people=await Person.create(
{
name:req.body.name,
age:Number(req.body.age),
email:req.body.email,
department:req.body.department,
phone:req.body.phone,
city:req.body.city,
street:req.body.street,
year:Number(req.body.year)
});
res.status(201).json(people);

}catch(e){
res.status(400).json({error: e.message});

}
});
app.put("/:id",async (req,res) => {
   try {
      const update=await Person.findByIdAndUpdate(req.params.id,
         {
            name:req.body.name,
            age:Number(req.body.age),
            email:req.body.email,
            department:req.body.department,
            phone:req.body.phone,
            city:req.body.city,
            street:req.body.street,
            year:Number(req.body.year)
         },
      {new:true}
   );
   if (!update) return  res.status(404).json({error: "Not Found"});
 res.json(update);
   } catch (e) {
         res.status(400).json({error:e.message})
   }});
   app.delete("/:id",async(req,res)=>{
      try {
         const deleted=await Person.findByIdAndDelete(req.params.id);
         if(!deleted) 
         return res.status(404).json({error:"Not found"});
      res.json({message:"Deleted Successfully"});
      
   } catch (e) {
         res.status(400).json({error:e.message});
      }
   });
app.listen(4000,()=> console.log("Server is running in http://localhost:4000"));