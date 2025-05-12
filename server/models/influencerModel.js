const {  mongoose } = require("mongoose");

const influencerSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required: [true, "Please Enter Your Name"]
        },
        niche : {
            type : String,
            required: [true, "Please Enter Your Niche"],
            enum : ['lifstyle', 'education', 'fashion', 'sports', 'technology','gaming', 'blogger', 'fitness','podcasts','devotional', 'comic', 'food', 'beauty', 'Gaming', 'other']
        },
        gender : {
            type : String,
            required: [true, "Please Enter Your Gender"] ,
            enum : ['male', 'female', 'other']
        },
        followers : {
            type : String,
            required : true
        },
        instagram_handle : {
            type : String,
            required : true,
            unique : true
        },
        rate : {
            type : Number,
            required : true
        },
        location : {
            type : String,
            required : true
        },
        isActive : {
            type : Boolean,
            default : true,
            required : true
        },
        profilePic : {
            type : String,
            required : true
        }
    },{
        timestamps : true
    }
)

module.exports = mongoose.model("Influencer", influencerSchema)