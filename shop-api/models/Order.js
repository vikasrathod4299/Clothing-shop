const mongoos = require('mongoose')

const OrderSchema= new mongoos.Schema({
    userId: {type :String, required:true},
    products:[
        {
            productId:{type:String},
            img:{type:String},
            color:{type:String},
            size:{type:String},
            price:{type:Number},
            quantity:{type:Number,default:1},
        }
    ],
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String, default:"pending"}

},{timestamps:true})  

module.exports=mongoos.model('Order',OrderSchema)