const express = require("express");
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Import the route files
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');

const app = express();
app.use(cookieParser());
app.use(errorHandler);

app.use(express.json());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

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

// Use the route files
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
