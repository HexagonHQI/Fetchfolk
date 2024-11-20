// backend/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import the user controller
const { authenticateToken } = require('../middleware/authMiddleware'); // Import the authentication middleware

// New user
router.post('/', userController.createUser ); // Use the controller method for creating a user

// All users
router.get('/', authenticateToken, userController.getUsers); // Use the controller method and protect the route

// Get a user by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User  not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;