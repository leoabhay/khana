const express = require('express');
const bcrypt = require('bcrypt');
const collection = require('../config/dbConfig');
const { loginValidationRules, validate } = require('../middleware/validation');

const router = express.Router();

router.post("/", loginValidationRules(), validate, async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).send("Wrong password");
        }

        res.render("home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
