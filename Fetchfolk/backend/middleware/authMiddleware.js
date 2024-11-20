// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to check for a valid token
exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer <token>

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Save the user info to the request object
        next(); // Proceed to the next middleware/route handler
    });
};