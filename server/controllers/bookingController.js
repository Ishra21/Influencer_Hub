const expressAsyncHandler = require('express-async-handler')
const Booking = require('../models/bookingsModel')
const Influencer = require('../models/influencerModel')
const User = require('../models/userModel')

const getBookings = expressAsyncHandler(async(req,res) =>{
    // res.send("All My Bookings Here")

    const myBookings = await Booking.find({user : req.user._id}).populate("influencer")
    console.log(myBookings)
    if(!myBookings){
        res.status(400)
        throw new Error("Influencer Not Exist")
    }
    res.status(200).json(myBookings)
}  
)

const getBooking =  expressAsyncHandler(async(req,res) =>{
    // res.send("All My Bookings Here")

    const myBooking = await Booking.findById(req.params.bid).populate("influencer")
    
    if(!myBooking){
        res.status(400)
        throw new Error("Influencer Not Exist")
    }
    res.status(200).json(myBooking)
}  
)


const addBooking = expressAsyncHandler(async(req,res) =>{
    // res.send("Boooking Added")
    // console.log(req.user, req.params)
    
    // Find if influencer exist
    const influencer = await Influencer.findById(req.params.id)
    // console.log("influencer" , influencer)

    if(!influencer){
        res.status(400)
        throw new Error("Influencer Not Exist")
    }
    
    // Check if influencer is already booked by user

    const alreadyBooked = await Booking.findOne({influencer})

    if(alreadyBooked){
        res.status(400)
        throw new Error("Booking Already Exist!")
    }
    
// Update influencer
await Influencer.findByIdAndUpdate(influencer._id, {isActive : false}, {new : true})

// Create Booking
    const newBooking = await Booking.create({
        user : req.user._id,
        influencer : influencer._id,
        status : "pending"
    })


    if(!newBooking){
        res.status(400)
        throw new Error("Booking  Not Created")
    }
    res.status(201).json(newBooking)
})

module.exports = {getBookings,getBooking,addBooking}