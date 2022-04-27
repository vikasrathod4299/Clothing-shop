const router = require('express').Router();
const { json } = require('body-parser');
const Product = require('../models/Product');
const {verfyToken,verifyTokenAuthentication, verifyTokenAdminAuth} = require("./verifyToken");


//ADD PRODUCTS
router.post('/', verifyTokenAdminAuth, async (req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct) 
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE PRODUCTS
router.put("/:id",verifyTokenAdminAuth, async(req,res)=>{
    try{
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
            $set:req.body
            },
            {new:true}
            );

        res.status(200).json(updateProduct)

    }catch(err)
    {
        res.status(500).json(err)
    }
})


//DELETE PRODUCTS
router.delete("/:id",verifyTokenAdminAuth, async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been delete")
    }catch(err)
    {
        res.status(500).json(err)
    }
})

//GET PRODUCTS BY id 
router.get("/find/:id", async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    }catch(err)
    {
        res.status(500).json(err)
    }
})


//GET ALL PRODUCTS 
router.get("/", async(req,res)=>{
    const Qnew = req.query.new
    const Qcategory = req.query.category
    try{
        let product;
        if(Qnew){
            product = await Product.find().sort({_id:-1}).limit(2)
        }
        else if(Qcategory){
            product = await Product.find({
                categories:{
                    $in:[Qcategory]
                }
            });
        }
        else{
            product=await Product.find()
        }
        res.status(200).json(product)
    }catch(err)
    {
        res.status(500).json(err)
    }
})



module.exports = router;