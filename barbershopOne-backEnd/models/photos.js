const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    imageUrl: {type: String, required: true},
    imagePublicId: {type: String, required: true},
    category: {type: String, required: true}
},{ versionKey: false })

module.exports = mongoose.model("Photo", photoSchema, "gallery");