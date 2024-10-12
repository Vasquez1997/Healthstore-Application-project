const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
});

module.exports = mongoose.model('Supplement', supplementSchema);
