const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({

    firstname : String ,
    lastname : String ,
    email : String ,
    password : String ,
    role : {  
        type: String ,
        enum:['partner','user','admin','member'],
        default:'user'
    },

    picture: String,
    birthdate: Date,
    address: String,
    phone: Number

})

module.exports = mongoose.model('users' , userSchema)