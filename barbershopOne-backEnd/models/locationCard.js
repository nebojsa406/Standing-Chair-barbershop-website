const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    address: {type: String, required: true},
    workingTime: [{type: String, required: true}],
    contactNum: {type: String, required: true},
    contactEmail: {type: String, required: true},
    workingDays: [{type: String, required: true}],
    notWorkingDays: [{type: String, required: true}],
    googleMapsLink: {type: String, required: true},
    googleMapsEmbedLink: {type: String, required: true}
});

module.exports = mongoose.model("LocationCard", locationSchema, "location");