const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required: [true, "Please Enter Your Name"]
        },
        email : {
            type : String,
            required: [true, "Please Enter Your Email"],
            unique : true,
        },
        phone : {
            type : String,
            required: [true, "Please Enter Your Phone"],
            unique : true,
        },
        password : {
            type : String,
            required: [true, "Please Enter Your Password"],
        },
        isAdmin : {
            type : Boolean,
            default : false,
            required : true
        }
    },{
        timestamps : true
    }
)

module.exports = mongoose.model("User", userSchema)