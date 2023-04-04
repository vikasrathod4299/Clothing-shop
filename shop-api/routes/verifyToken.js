const jwt = require('jsonwebtoken')

const verfyToken =  (req,res,next)=>{
    authHeader = req.headers['token'];
    if(authHeader)
    {
        
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.jwtToken,(err,user)=>{
            if(err){
                console.log("up")
                res.status(403).json("Token is not valid!")
            }
            else
            { 
                req.user=user;
                next()
            }
        })
    }
    else
    {
        res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAuthentication = (req,res,next)=>{
    const id = req.params
    verfyToken(req,res,()=>{
        if(req.user.id == id.id || req.user.isAdmin){
            console.log("next")
            next()
        }
        else{
            console.log("here")
            res.status(403).json("you ar not authenticated")
        }
    })

    }


const verifyTokenAdminAuth = (req,res,next)=>{
    verfyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            res.status(403).json("You are not allowed to do that")
        }
    })

    }
 

module.exports = {verfyToken,verifyTokenAuthentication,verifyTokenAdminAuth}