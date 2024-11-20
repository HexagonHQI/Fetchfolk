// backend/models/ItemRequest.js
const mongoose = require('mongoose');

const itemRequestSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    requestDate: { type: Date, default: Date.now },
    requesterName: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    travelerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
});

module.exports = mongoose.model('ItemRequest', itemRequestSchema);