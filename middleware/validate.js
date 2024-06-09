module.exports = function(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Name, email and password are required');
    }
    next();
};
