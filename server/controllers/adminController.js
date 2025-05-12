const expressAsyncHandler = require("express-async-handler")
const Influencer = require('../models/influencerModel')
const Booking = require('../models/bookingsModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')

const createInfluencer = expressAsyncHandler(async(req,res)=>{
    // res.send("Influencer Added")

    // check if all field are filled
    const {name, niche,followers, instagram_handle, rate, location, profilePic, gender} = req.body

    if(!name || !niche || !followers || !instagram_handle || !gender || !rate || !location || !profilePic){
        res.status(400)
        throw new Error("Please fill All Details")
    }
    
//    Check if influencer exist
const influencerExist =  await Influencer.findOne({instagram_handle})

if(influencerExist) {
    res.status(400)
    throw  new Error("Influencer Already Exist")
}

// Create Influencer
const newInfluencer = await Influencer.create({
    name,
    niche,
    followers,
    instagram_handle,
    rate,
    location,
    profilePic,
    gender
})

if(!newInfluencer){
    res.status(400)
    throw new Error("Influencer Not Created")
}
res.status(201).json(newInfluencer)


})

const updateInfluencer =expressAsyncHandler( async(req,res)=>{
    // res.send("Influencer update")
    const updatedInfluender = await Influencer.findByIdAndUpdate(req.params.id, req.body, {new : true})
    if(!updatedInfluender){
        res.status(400)
        throw new Error("Influencer Not Updated")
    }
    res.status(200).json(updatedInfluender)
    // console.log(updatedInfluender)
})

const removeInfluencer = expressAsyncHandler(async(req,res)=>{
    // res.send("Influencer deleted")
    await Influencer.findByIdAndDelete(req.params.id)
    res.status(200).json({
    id : req.params.id,
    msg : "Influencer Removed"
})

})


const getAllBookings = expressAsyncHandler(async(req,res)=>{
    // res.send("All Users Booking")

    const allBookings = await Booking.find().populate("user").populate("influencer")
    // const allBookings = await Booking.find()

    // console.log(allBookings)
    if(!allBookings){
        res.status(400)
        throw new Error("No Bookings Found")
    }
    res.status(200).json(allBookings)
}
)


const updateBooking = expressAsyncHandler(async(req,res)=>{
    // res.send(" User Booking update")

    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {new : true}).populate("user").populate("influencer")

    if(!updatedBooking){
        res.status(400)
        throw new Error("Booking Not Updated")
    }
    res.status(200).json(updatedBooking)
})


const getAllUser = expressAsyncHandler(async(req,res) => {
    
    const users = await User.find().select("-password")
    
    if(!users){
        res.status(404)
        throw new Error("User Not Found")
    }
    res.status(200).json(users)
})

const getAllComments = expressAsyncHandler(async(req,res) => {
    
    const comments = await Comment.find().populate("user")
    
    if(!comments){
        res.status(404)
        throw new Error("No Comments")
    }
    res.status(200).json(comments)
})

module.exports = {createInfluencer,updateInfluencer,removeInfluencer,getAllBookings,updateBooking, getAllUser, getAllComments}