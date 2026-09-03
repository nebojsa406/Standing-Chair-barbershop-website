const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    address: {type: String, required: true},
    workingTime: {type: String, required: true},
    contact: {type: String, required: true}
});

module.exports = mongoose.model("LocationCard", locationSchema, "location");