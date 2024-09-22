const express=require("express");
const router=express.Router();

const Hall=require('../models/hall')

//fetches all details of rooms..
router.get("/getallhalls",async(req,res)=>{
    try{
        const halls=await Hall.find({})
        return res.send(halls)
    }
    catch(error){
        return res.this.status(400).json({message:error}) ; 
    }
});


router.post("/gethallbyid",async(req,res)=>{
    const hallid=req.body.hallid
    try{
        const hall=await Hall.findOne({_id:hallid})
        return res.send(hall)
    }
    catch(error){
        return res.this.status(400).json({message:error}) ; 
    }
});


// routes/halls.js
// Add new hall route
router.post('/addhall', async (req, res) => {
    try {
        const newHall =new Hall( req.body) // Access the hall details from the request body
        // Save the hall to the database (implement your own logic here)
        // For example, Hall.create(newHall)
        await newHall.save()

        res.status(200).json({ message: 'Hall added successfully', data: newHall });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add hall' });
    }
});



module.exports=router;