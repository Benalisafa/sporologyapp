const express=require('express')
require('dotenv').config()
const cors = require ('cors')
const app=express()
const mongoose = require('mongoose')
// const {requireAuth} = require('./server/middleware/user.middleware')

// Routes

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello")
})

// app.get("/activities/createactivity",(req,res)=>{
//     res.send("hi")
// })


// app.get ("/profile", requireAuth, (req, res) => res.render('activities'));

const userRoutes = require ('./routes/user.router')
const activityRoutes = require('./routes/activity.router')


app.use('/users' , userRoutes)
app.use('/activities' ,activityRoutes)

mongoose.connect(process.env.CONNECTION_STRING)

const db = mongoose.connection;

db.on("error" , console.error.bind(console,"connection error :"));
db.once("open", function(){
    console.log("database connected")
})

// console.log({__dirname});
// app.post('/upload-by-link', async (req,res)) => {
//     const {link} = req.body;
//     await imageDownloader.image({
//         url: link,
//         dest: __dirname+'/uploads'
//     })
// } 


// Server setup
app.listen(process.env.PORT,()=>{                          //express port default is 3000
    console.log(`port ${process.env.PORT} connected`);
})                                             // "nodemon src/index.js in terminal"for port to connect everytime

