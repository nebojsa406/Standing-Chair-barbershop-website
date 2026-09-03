const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {browseLimiter, crudLimiter, authenticateAccessToken, requireAdmin } = require("../middleware/auth.js");
const LocationCard = require("../models/locationCard.js")

//get locations
router.get("/", browseLimiter, async(req, res) => {
    try {
        const services = await LocationCard.find();
        if (services.length === 0) return res.status(200).json({message: "no services found, list of services is empty"});
        res.status(200).json({services});
    } catch (err) {
        throw err;
    }
});

module.exports = router;