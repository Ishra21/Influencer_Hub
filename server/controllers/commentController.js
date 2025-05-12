const expressAsyncHandler = require("express-async-handler")
const Comment = require('../models/commentModel')

const getComments = async(req,res) =>{
    // res.send("Get All Comments")
    const comments = await Comment.find({booking : req.params.bid}).populate("user")
    // console.log(comments)

    if(!comments){
        res.status(404)
        throw new Error("No Comment Found")
    }
    res.status(200).json(comments)

}

const addComments = expressAsyncHandler(async(req,res) =>{
    // res.send("Add Comments")
// console.log(req.body.text)

    if(!req.body.text){
        res.status(400)
        throw new Error("Please Enter your comment")
    }

    const comment = await Comment.create({
        user : req.user._id,
        booking : req.params.bid,
        text : req.body.text 
    })


    if(!comment){
        res.status(400)
        throw new Error("Comment not created")
    }

    const newComment = await Comment.findById(comment._id).populate("user", "name email")
    // console.log(newComment)          
    res.status(201).json(newComment)

})

module.exports = {getComments,addComments}