const express=require('express')
const multer = require('multer');
const path = require('path');
require('dotenv').config()
const cors = require ('cors')
const passport = require("passport")
const app=express()
const mongoose = require('mongoose')





// Routes

app.use(express.json())
app.use(cors())
app.use(passport.initialize())
require ("./middleware/passport")

app.get("/",(req,res)=>{
    res.send("hello")
})






const authRoutes = require ('./routes/auth.router')
const userRoutes = require ('./routes/user.router')

const activityRoutes = require('./routes/activity.router')

const bookingRoutes = require('./routes/booking.router')


app.use('/users' , authRoutes)
app.use('/users' , userRoutes)
app.use('/activities' ,activityRoutes)
app.use('/bookings' ,bookingRoutes)

mongoose.connect(process.env.CONNECTION_STRING)

const db = mongoose.connection;

db.on("error" , console.error.bind(console,"connection error :"));
db.once("open", function(){
    console.log("database connected")
})




// Server setup
app.listen(process.env.PORT,()=>{                        
    console.log(`port ${process.env.PORT} connected`);
})                                             

