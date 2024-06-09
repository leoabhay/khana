const express = require("express");
const collection = require("./config/dbConfig");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cookieParser());
app.use(errorHandler);

// convert data into json format
app.use(express.json());

// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

//use ejs as the view engine
app.set("view engine", "ejs");

app.get('/api/protected', authMiddleware, (req, res) => {
    res.send('Welcome to the protected route');
});

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        
        res.redirect('/');
    }

});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email }); // Query based on email instead of username

        if (!user) {
            return res.send("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.send("Wrong password");
        }

        res.render("home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});