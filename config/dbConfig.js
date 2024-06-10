const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/khanakhajana")
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

// Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email uniqueness
    },
    password: {
        type: String,
        required: true
    }
});

// Create and export the model
const User = mongoose.model("User", UserSchema);

module.exports = User;
