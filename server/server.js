const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db_config')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 8000

// DB Connection
connectDB()

app.use(cors({
    origin: '*', // or your frontend URL
    credentials: true
}));

// Body Paraser
app.use(express.json());
app.use(express.urlencoded({extended : true}))



app.get("/", (req,res) =>{
    res.json({
        msg : "WELCOME TO INFLUNCER ADDA API"
    })
})



// Auth Routes
app.use("/api/auth", require('./routes/authRoutes'))


// Admin Routes
app.use('/api/admin', require('./routes/adminRoutes'))

// Booking Routes
app.use('/api/booking', require('./routes/bookingRoutes'))

// Influencer Routes
app.use('/api/influencer', require('./routes/influencerRoutes'))

// Comments Routes
app.use('/api/comments', require('./routes/commentRoutes'))



// Error handler
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`server is running at  port : ${PORT}`.bgGreen.black)
})
