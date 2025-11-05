const User = require('../models/User')
const JWTutils = require('../utils/JWTutils')
const registerValidator = require('../utils/validators/registerValidation')
const bcrypt = require('bcrypt')
const loginValidator = require('../utils/validators/loginValidation')

exports.signup = async (req, res) => {
    const { error } = registerValidator(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(409).json({ error: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        const token = JWTutils.generateAuthToken({name: savedUser.name, email: savedUser.email, id: savedUser._id})
        res.status(201).json({ token: token, user: savedUser, message: 'Registration successful' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
}

exports.login = async (req, res) => {
  // Validate user input
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    // Compare password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).json({ error: 'Invalid email or password' });

    // Generate JWT token
    const token = JWTutils.generateAuthToken({name: user.name, email: user.email, id: user._id})
    res.status(201).json({ token: token, user: user, message: 'Registration successful' });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

