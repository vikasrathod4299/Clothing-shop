const mongoos = require('mongoose')

const CartSchema= new mongoos.Schema({
    userId: {type :String, required:true},
    products:[
        {
            productId:{type:String},
            quantity:{type:Number,default:1}
        }
    ],

},{timestamps:true})  

module.exports=mongoos.model('Cart',CartSchema)