const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const app = express();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Static files
app.use(express.static('images'));
app.use(express.static('picture'));

// Middleware
app.use(express.json()); 
app.use(cors()); 
app.use(passport.initialize()); 
require("./middleware/passport"); 

// Contact form route
app.post('/contact', (req, res) => {
    const { title, email, description } = req.body;

    // Configure Nodemailer with SMTP settings
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: 'safabenali36@gmail.com',
        subject: `Contact Form Submission: ${title}`,
        text: `Email: ${email}\n\nDescription:\n${description}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Routes
const authRoutes = require('./routes/auth.router');
const userRoutes = require('./routes/user.router');
const activityRoutes = require('./routes/activity.router');
const reviewRoutes = require('./routes/review.router');
const bookingRoutes = require('./routes/booking.router');
const familyMemberRoutes = require('./routes/familyMember.route');
const categoryRoutes = require('./routes/category.route');

app.use('/users', authRoutes);
app.use('/users', userRoutes);
app.use('/activities', activityRoutes);
app.use('/reviews', reviewRoutes);
app.use('/bookings', bookingRoutes);
app.use('/familyMembers', familyMemberRoutes);
app.use('/categories', categoryRoutes);

mongoose.connect(process.env.CONNECTION_STRING)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Database connected");
});

// Server setup
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
