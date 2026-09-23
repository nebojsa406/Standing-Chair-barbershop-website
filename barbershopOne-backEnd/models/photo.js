const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    imageUrls: { type: [String], default: [] },
    imagePublicIds: { type: [String], default: [] },
    category: {type: String, required: true}
})

module.exports = mongoose.model("Photo", photoSchema, "gallery");