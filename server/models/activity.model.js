const mongoose =require('mongoose')

const activitySchema = new mongoose.Schema({

    title: String,
    description: String,
    photos: String,
    date: Date,
    location: String,
    duration : Number,
    time : Date,
    capacity: Number,
    price: Number,
    // reviews: [],
    category:{
        type : mongoose.Types.ObjectId
    //     ref : 'categories'
        

     },
    creator:{
        type : mongoose.Types.ObjectId,
        ref : 'partners'
        // required:true
    }


})

module.exports = mongoose.model('activities',activitySchema)