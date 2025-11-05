const express = require('express')
const user_router = express.Router()
const {signup} = require('../../controllers/auth.controller')
const {login} = require('../../controllers/auth.controller')
const verifyUser = require('../../middlewares/verifyUser')

user_router.post('/signup', signup)
user_router.post('/login', login)
user_router.get('/verify', verifyUser, (req, res) => {
    const user = req.user
    res.json({
        user: user,
        verified: true,
        
    })
})

module.exports = user_router