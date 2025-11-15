const express = require('express');
const user_router = express.Router();

const { signup, login } = require('../../controllers/auth.controller');
const verifyUser = require('../../middlewares/verifyUser');

// Signup
user_router.post('/signup', signup);

// Login
user_router.post('/login', login);

// Verify user
user_router.get('/verify', verifyUser, (req, res) => {
    return res.json({
        user: req.user,
        verified: true
    });
});

module.exports = user_router;
