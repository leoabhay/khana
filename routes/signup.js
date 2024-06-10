const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../config/dbConfig'); // Ensure this path is correct
const { signupValidationRules, validate } = require('../middleware/validation');

const router = express.Router();

router.post("/", signupValidationRules(), validate, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: [{ email: 'Email address already exists' }] });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const userData = await newUser.save();
        console.log(userData);

        // Redirect to home page after successful signup
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

module.exports = router;
