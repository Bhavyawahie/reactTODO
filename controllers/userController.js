const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require("../models/userModel")

//  @desc:   Register a new user
//  @route:  POST /api/users/
//  @access: Public     

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
        res.status(400)
        throw new Error('User already exists!')
    }
    const user = await User.create({
        name, 
        email, 
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data!')
    }

})
//  @desc:   Authenticate already registered users
//  @route:  POST /api/users/login
//  @access: Public     

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){
        res.status(202).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password!')
    }
})

module.exports = {
    register,
    authUser
}