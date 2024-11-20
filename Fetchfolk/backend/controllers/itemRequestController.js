// controllers/itemRequestController.js
const ItemRequest = require('../models/ItemRequest');

// Create a new item request
exports.createItemRequest = async (req, res) => {
    const { itemName, quantity, requesterName } = req.body;

    try {
        const newItemRequest = new ItemRequest({ itemName, quantity, requesterName });
        await newItemRequest.save();
        res.status(201).json({ message: 'Item request created successfully', itemRequest: newItemRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating item request', error: error.message });
    }
};

// Get all item requests
exports.getItemRequests = async (req, res) => {
    try {
        const itemRequests = await ItemRequest.find();
        res.status(200).json(itemRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item requests', error: error.message });
    }
};