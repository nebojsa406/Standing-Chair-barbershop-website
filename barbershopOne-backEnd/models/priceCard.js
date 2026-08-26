const mongoose = require("mongoose");

const priceCardSchema = new mongoose.Schema({
    service: {type: String, required: true},
    price: {type: String, required: true},
    time: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model("PriceCard", priceCardSchema, "prices");