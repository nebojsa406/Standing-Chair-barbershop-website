const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ServiceCard = require("../models/serviceCard.js");
const {browseLimiter, crudLimiter, authenticateAccessToken, requireAdmin } = require("../middleware/auth.js");
const { validatePhoneNumber } = require('../services/twilio.js');
const { verifyPhoneFormatMonteNegro } = require("../services/verifyPhoneFormat.js");
const { findByIdAndDelete } = require("../models/appointment.js");


//get services
router.get("/", browseLimiter, async(req, res) => {
    try {
        const services = await ServiceCard.find();
        if (services.length === 0) return res.status(200).json({message: "no services found, list of services is empty"});
        res.status(200).json({services});
    } catch (err) {
        throw err;
    }
});

//post serviceCard
router.post("/", crudLimiter, authenticateAccessToken, requireAdmin, async(req, res) => {
    try {
        const serviceBody = new ServiceCard({
            service: req.body.service,
            price: req.body.price,
            time: req.body.time,
            category: req.body.category,
            description: req.body.description
        })

        const newService = await serviceBody.save();
        res.status(201).json(newService);
    } catch (err) {
        throw err
    }
});


//update serviceCard
router.patch("/:id", crudLimiter, authenticateAccessToken, requireAdmin, async(req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) return res.status(400).json({message: "request body is empty"});

        const updateserviceCard = await ServiceCard.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );

        if (!updateserviceCard) return res.status(404).json({message: "user not found"});

        res.status(200).json(updateserviceCard);
    } catch (err) {
        throw err
    }
});

//delete serviceCard
router.delete("/:id", crudLimiter, authenticateAccessToken, requireAdmin, async(req, res) => {
    try {
        const serviceCard = await ServiceCard.findByIdAndDelete(req.params.id);

        if (!serviceCard) return res.status(404).json({message: "serviceCard not found,failed to delete"});

        res.status(200).json(serviceCard);
    } catch (err) {
        throw err
    }
});

module.exports = router;