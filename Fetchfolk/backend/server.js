const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB (MongoDB Atlas or local)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fetchfolk', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Models
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    role: String,
    email: String,
    preferences: {
        flightDate: Date,
        from: String,
        to: String
    }
}));

const Request = mongoose.model('Request', new mongoose.Schema({
    recipientId: mongoose.Schema.Types.ObjectId,
    travelerId: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: 'pending' },
    details: {
        goodsDescription: String,
        weight: String
    }
}));

// Express App
const app = express();
app.use(bodyParser.json());
app.use(cors());

// API Endpoints
app.post('/api/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

app.get('/api/match', async (req, res) => {
    const { flightDate, from, to } = req.query;
    const travelers = await User.find({
        role: 'traveler',
        'preferences.flightDate': flightDate,
        'preferences.from': from,
        'preferences.to': to
    });
    res.send(travelers);
});

app.post('/api/connect', async (req, res) => {
    const { recipientId, travelerId, details } = req.body;
    const request = new Request({ recipientId, travelerId, details });
    await request.save();
    res.status(201).send({ message: 'Connection request sent', request });
});

// Start Server (dynamic port for Render)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
