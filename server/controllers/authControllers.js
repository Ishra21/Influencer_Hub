const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const registerUser = expressAsyncHandler(async(req,res)=>{
    // res.send("User Registered")

    const {name, email, phone, password} = req.body;

    if(!name || !email || !phone || !password){
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    // Check is user already exists
    const emailExist = await User.findOne({email : email})
    const phoneExist = await User.findOne({phone : phone})

    if(emailExist || phoneExist){
        res.status(400)
        throw new Error("User Already Exist")
    }


    // hash password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)


    const user = await User.create({name, phone,email,password : hashedPassword});
    if(!user) {
        res.status(400)
        throw new Error("User Not Created")
    }
    res.status(201)
    res.json(
        {
            id : user._id,
            name : user.name,
            email: user.email,
            isAdmin : user.isAdmin,
             memberSince : user.createdAt.toString().slice(0, 15),
            token : generateToken(user._id)
        }
    )
}
)

const loginUser = expressAsyncHandler(async(req,res)=>{
    // res.send("User Login")
const  {email,password} = req.body
if(!email || !password) {
    res.status(400)
    throw new Error("Please fill All Details")
}

const user  = await User.findOne({email : email})

if(user && bcrypt.compareSync(password, user.password)){
    res.status(200).json({
        id : user._id,
        name : user.name,
        email: user.email,
        isAdmin : user.isAdmin,
        token : generateToken(user._id),
        memberSince : user.createdAt.toString().slice(0, 15),
      
    })
}
else{
    res.status(401)
    throw new Error("Invalid Credentials")
}
})

const privatController = async(req,res) => {
    // res.send("private Controller")
    res.json({
        id : req.user._id,
        name : req.user.name,
        email: req.user.email,
        isAdmin : req.user.isAdmin,
    })
}

// Generate token
const generateToken = (id) => {
    return token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : '30d'})
}


module.exports = {loginUser,registerUser, privatController}