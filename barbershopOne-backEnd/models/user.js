const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    sessions: [
        {
            refreshToken: {type: String, required: true, unique: true},
            createdAt: {type: Date, default: Date.now},
            expiresAt: {type: Date},
            userAgent: {type: String}
        }
    ]
});

module.exports = mongoose.model("user", userSchema);