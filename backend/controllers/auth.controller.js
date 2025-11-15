const User = require('../models/User');
const JWTutils = require('../utils/JWTutils');
const registerValidator = require('../utils/validators/registerValidation');
const loginValidator = require('../utils/validators/loginValidation');
const bcrypt = require('bcrypt');


// ======================= SIGNUP ==========================
exports.signup = async (req, res) => {
    try {
        // Validate request body
        const { error } = registerValidator(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Check if user already exists
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return res.status(409).json({ error: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        const token = JWTutils.generateAuthToken({
            name: savedUser.name,
            email: savedUser.email,
            id: savedUser._id
        });

        return res.status(201).json({
            token,
            user: savedUser,
            message: 'Signup successful'
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


// ======================= LOGIN ==========================
exports.login = async (req, res) => {
    try {
        // Validate body
        const { error } = loginValidator(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Find user
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ error: 'Invalid email or password' });

        // Validate password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(401).json({ error: 'Invalid email or password' });

        // Generate token
        const token = JWTutils.generateAuthToken({
            name: user.name,
            email: user.email,
            id: user._id
        });

        return res.status(200).json({
            token,
            user,
            message: 'Login successful'
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
