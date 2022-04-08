const router = require('express').Router();
const Cart = require('../models/Cart');
const {verfyToken,verifyTokenAuthentication, verifyTokenAdminAuth} = require("./verifyToken");


//CREATE
router.post('/', verfyToken, async (req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart) 
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/exists/:userId', async (req,res)=>{
    try{
        id=req.params.userId
        const bool = await Cart.find({"userId":id}).count() > 0
        res.status(200).json(bool)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
//UPDATE CART
router.put("/:userId",verifyTokenAuthentication, async(req,res)=>{
    try{
        const updateCart = await Cart.updateOne({userId:req.params.userId},{$push:{products:req.body}});
        
        res.status(200).json(updateCart)
    }catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
})


//DELETE CART
router.delete("/:id",verifyTokenAuthentication, async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been delete from cart")
    }catch(err)
    {
        res.status(500).json(err)
    }
})

//GET USER CART 
router.get("/find/:userId",verifyTokenAuthentication, async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userId});

        res.status(200).json(cart)
    }catch(err)
    {
        res.status(500).json(err)
    }
})


//GET ALL CART ADMIN
router.get("/", verifyTokenAdminAuth ,async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts)
    }catch(err)
    {
        res.status(500).json(err)
    }
})



module.exports = router;