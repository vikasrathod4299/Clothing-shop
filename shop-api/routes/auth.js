const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { route } = require('./user');
const jwt = require('jsonwebtoken')


//REGISTER
router.post('/register',async(req,res)=>{
    try{
        const hashedPass = await bcrypt.hash(req.body.password,10)
        const newUser = new User({...req.body,hashedPass})
        const savedUser= await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        console.log(err)
        res.status(500).json("This is user is all ready exist")
    }

})


//LOGIN
router.post('/login',async(req,res)=>{
    try{
        
        const user = await User.findOne({username:req.body.username})
   
        if(user)
        {
            if(await bcrypt.compare(req.body.password,user.password)){
                const accessToken = jwt.sign({id:user.id, isAdmin:user.isAdmin},process.env.jwtToken,{expiresIn:"1d"}) 
                const {password, ...others} = user._doc

                res.status(200).json({others,accessToken})
            }
            else{
                res.status(401).json("Wrong Password")
            }
        }
        else
        {
            res.status(401).json("User is not registerd!!")
        }
        

    }catch(err)
    {
        res.status(500).json(err)
    }
})

module.exports = router;