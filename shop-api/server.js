const express = require('express');
const mongoos = require('mongoose');
const dotenv=require('dotenv');
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const bodyParser = require('body-parser')
const productRoute = require('./routes/product')
const stripeRoute = require("./routes/stripe")
const cartRoute = require("./routes/cart")
const OrderRoute = require("./routes/order")
const cors = require("cors");

        
dotenv.config();
const app= express()

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
app.use(cors());


//ROUTES
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/checkout",stripeRoute)
app.use("/api/cart",cartRoute)
app.use("/api/orders",OrderRoute)



mongoos.connect(process.env.DB_URL).then(()=>{ console.log("Database is connected") }).catch((err)=>{ console.log(err) })


app.listen(process.env.PORT || 3000,()=>{
    console.log(`It's alive on Port: ${process.env.PORT || 3000}`)
}) 