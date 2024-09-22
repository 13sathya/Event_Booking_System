const express=require("express");
const router=express.Router();
const Owner=require("../models/owner")

router.post("/ownerregister",async(req,res)=>{
     const newowner=new Owner({name:req.body.name,email:req.body.email,password:req.body.password})
     try{
        const owner=await newowner.save()
        res.send('Owner Registered Successfully')
     }
     catch(error){
        return res.status(400).json({error});
     }
});

 router.post("/ownerlogin",async(req,res)=>{
    const{email,password}=req.body
    try {
        const owner=await Owner.findOne({email:email,password:password})
        if(owner){
            const temp={
                //doesn't contain any password
                name:owner.name,
                email:owner.email,
                _id:owner._id,
            }
            res.send(temp)
        }
        else{
            return res.status(400).json({message:'Login Failed'});
        }
    } catch (error) {
        return res.status(400).json({error});
    }
 });

  router.get("/getallowners", async(req,res)=>{
    try {
        const owners=await Owner.find()
        res.send(owners)
    } catch (error) {
        return res.status(400).json({error});
    }
  });

 module.exports=router