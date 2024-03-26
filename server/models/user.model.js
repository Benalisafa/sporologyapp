const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({

    firstname : String ,
    lastname : String ,
    email : String ,
    password : {
        type : String ,
        unique : true,
    },

    role : {  
        type: String ,
        enum:['partner','member','admin'],
        default:'member'
    },

    picture: String,
    birthdate: Date,
    address: String,
    phone: Number

})

module.exports = mongoose.model('users' , userSchema)