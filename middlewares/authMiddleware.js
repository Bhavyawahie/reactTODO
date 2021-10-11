const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // token returns the associated user's _id
            req.user = await User.findById(decodedToken).select(-password) //@ts-expect-error
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, token is invalid!')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token found')
    }
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports ={ 
    protect,
    admin
}

