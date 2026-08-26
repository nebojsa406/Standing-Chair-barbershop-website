const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PriceCard = require("../models/priceCard.js");
const {browseLimiter, crudLimiter, authenticateAccessToken, requireAdmin } = require("../middleware/auth");
const { validatePhoneNumber } = require('../services/twilio.js');
const { verifyPhoneFormatMonteNegro } = require("../services/verifyPhoneFormat.js");
const { findByIdAndDelete } = require("../models/appointment.js");


//get prices
router.get("/", browseLimiter, async(req, res) => {
    try {
        const prices = await PriceCard.find();
        if (prices.length === 0) return res.status(200).json({message: "no prices found, list of prices is empty"});
        res.status(200).json({prices});
        console.log(prices);
    } catch (err) {
        throw err;
    }
});

//post priceCard
router.post("/", crudLimiter, authenticateAccessToken, requireAdmin, async(req, res) => {
    try {
        const priceBody = new PriceCard({
            service: req.body.service,
            price: req.body.price,
            time: req.body.time,
            description: req.body.description
        })

        const newPrice = await priceBody.save();
        res.status(201).json(newPrice);
    } catch (err) {
        throw err
    }
});


//update priceCard
router.patch("/:id", crudLimiter, authenticateAccessToken, requireAdmin, async(req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) return res.status(400).json({message: "request body is empty"});

        const updatePriceCard = await PriceCard.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );

        if (!updatePriceCard) return res.status(404).json({message: "user not found"});

        res.status(200).json(updatePriceCard);
    } catch (err) {
        throw err
    }
});

//deletePriceCard
router.delete("/:id", crudLimiter, authenticateAccessToken, requireAdmin, async(req, res) => {
    try {
        const priceCard = await PriceCard.findByIdAndDelete(req.params.id);

        if (!priceCard) return res.status(404).json({message: "priceCard not found,failed to delete"});

        res.status(200).json(priceCard);
    } catch (err) {
        throw err
    }
});

module.exports = router;