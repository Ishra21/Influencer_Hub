const { mongoose } = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
        },
        influencer  : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Influencer",
            required : true
        },
        status : {
            type : String,
            enum : ['pending', 'accepted', 'rejected', 'completed'],
            default : "pending",
            required: [true, "Please Enter Your Status"]
        },
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("Booking", bookingSchema)