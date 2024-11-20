// controllers/userController.js
const User = require('../models/User');

// Create a new user
exports.createUser  = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const newUser  = new User({ username, password, role });
        await newUser .save();
        res.status(201).json({ message: 'User  created successfully', user: newUser  });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};