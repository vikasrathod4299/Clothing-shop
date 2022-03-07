const mongoos = require('mongoose')

const UserSchema= new mongoos.Schema({
    username: {type :String, required:true, unique:true},
    email:{type : String, required:true, unique:true},
    password:{type: String, required:true},
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})  

module.exports=mongoos.model('User',UserSchema)