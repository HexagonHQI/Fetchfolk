// backend/routes/itemRequests.js
const express = require('express');
const ItemRequest = require('../models/ItemRequest');
const router = express.Router();

// Create a new item request
router.post('/', async (req, res) => {
    const newItemRequest = new ItemRequest(req.body);
    try {
        const savedRequest = await newItemRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all item requests
router.get('/', async (req, res) => {
    try {
        const requests = await ItemRequest.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;