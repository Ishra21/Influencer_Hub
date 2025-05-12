const { mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({

user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
},
booking : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Booking",
    required : true
},
text :{
    type : String,
    required: [true, "Please Enter Your Comment"]
}

}, {
    timestamps : true
})

module.exports = mongoose.model("Comment", CommentSchema)