const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {verfyToken,verifyTokenAuthentication, verifyTokenAdminAuth} = require("./verifyToken")


//UPDATE USER 
router.put("/:id",verifyTokenAuthentication, async(req,res)=>{
    try{
        
        if (req.body.password){
            req.body.password = await bcrypt.hash(req.body.password,10)
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
            $set:req.body
            },
            {new:true}
            );

        res.status(200).json(updateUser)
    }catch(err)
    {
        res.status(500).json(err)
    }
})


//DELETE USER
router.delete("/:id",verifyTokenAuthentication, async(req,res)=>{
    try{
        
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("User has been delete")
    }catch(err)
    {
        res.status(500).json(err)
    }
})

//GET USER BY id (ADMIN)
router.get("/find/:id",verifyTokenAdminAuth, async(req,res)=>{
    try{
        
        user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others)
    }catch(err)
    {
        res.status(500).json(err)
    }
})


//GET ALL USER (ADMIN)
router.get("/",verifyTokenAdminAuth, async(req,res)=>{
    try{
        
        user = await User.find();
        // const {password,...others} = user._doc;
        res.status(200).json(user)
    }catch(err)
    {
        res.status(500).json(err)
    }
})

module.exports = router;