const express = require('express');
const mongoos = require('mongoose');
const dotenv=require('dotenv');
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const bodyParser = require('body-parser')
        
dotenv.config();
const app= express()

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())


app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)



mongoos.connect(process.env.DB_URL).then(()=>{ console.log("Database is connected") }).catch((err)=>{ console.log(err) })



app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running")
})