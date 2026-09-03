const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    service: {type: String, required: true},
    price: {type: String, required: true},
    time: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model("ServiceCard", serviceSchema, "services");