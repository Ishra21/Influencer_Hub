const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const expressAsyncHandler = require('express-async-handler')

const adminprotect = expressAsyncHandler(async (req,res,next) =>{
    console.log(req.headers)
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    
    
    
    let token 
    try {
        token = req.headers.authorization.split(" ")[1]
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
        req.user = await User.findById(decoded.id).select("-password")
        // console.log(req.user)
        if(req.user.isAdmin){
            next()
        } else{
            req.status(401)
            throw new Error("Only Admins have access")
        }
    }   catch (error) {
        res.status(400)
        throw new Error("Invalid Token : Access Denied")
    }
    
    } else{
        res.status(400)
        throw new Error("Invalid Token : Access Denied")
    }
    
    }
    
    )
module.exports = adminprotect