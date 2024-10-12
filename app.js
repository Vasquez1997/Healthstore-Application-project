const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Supplement = require('./models/supplement'); // Import the Supplement model

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/HealthStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// POST route to create a new supplement
app.post('/store/supplements', async (req, res) => {
    const supplement = new Supplement(req.body);
    try {
        await supplement.save();
        res.status(201).send(supplement);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET route to get all supplements
app.get('/store/supplements', async (req, res) => {
    try {
        const supplements = await Supplement.find();
        res.send(supplements);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET route to get a supplement by ID
app.get('/store/supplements/:id', async (req, res) => {
    try {
        const supplement = await Supplement.findById(req.params.id);
        if (!supplement) {
            return res.status(404).send();
        }
        res.send(supplement);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE route to delete all supplements
app.delete('/store/supplements', async (req, res) => {
    try {
        await Supplement.deleteMany();
        res.send({ message: 'All supplements deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE route to delete a supplement by ID
app.delete('/store/supplements/:id', async (req, res) => {
    try {
        const supplement = await Supplement.findByIdAndDelete(req.params.id);
        if (!supplement) {
            return res.status(404).send();
        }
        res.send({ message: 'Supplement deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Info route to provide a simple message
app.get('/info', (req, res) => {
    res.send({
        message: "Welcome to HealthStore application.",
        id: "949" 
    });
});
