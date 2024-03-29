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
    owner:{
        type : mongoose.Types.ObjectId,
        ref : 'users'
        // required:true
    },

    status: String,

    reservations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Reservations' 
      },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },

    isFavorite: {
        type: Boolean,
        default: false
      }

    

})

module.exports = mongoose.model('activities',activitySchema)