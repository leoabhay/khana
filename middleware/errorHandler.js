module.exports = function(err, req, res, next) {
    console.error(err.stack);
    if (!res.headersSent) {
        res.status(500).send('Internal server error');
    }
};
