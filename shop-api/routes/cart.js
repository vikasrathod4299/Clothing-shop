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
        res.status(500).json(err)
    }
})

//UPDATE CART
router.put("/:id",verifyTokenAuthentication, async(req,res)=>{
    try{
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
            $set:req.body
            },
            {new:true}
            );

        res.status(200).json(updateCart)
    }catch(err)
    {
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
router.get("/find/:userId", async(req,res)=>{
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