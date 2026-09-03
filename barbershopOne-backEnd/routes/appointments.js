const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Appointment = require("../models/appointment");
const { browseLimiter, crudLimiter, authenticateAccessToken, requireAdmin } = require("../middleware/auth");
const { validatePhoneNumber } = require('../services/twilio.js');
const { verifyPhoneFormatMonteNegro } = require("../services/verifyPhoneFormat.js");

//get times
router.get("/times", browseLimiter, async (req, res) => {
    try {
        const takenTimes = await Appointment.find({ date: { $gte: new Date().setHours(0,0,0,0) } }, { _id: 0, time: 1 });
        if (takenTimes.length === 0) return res.status(200).json({ message: "no taken times been found in present or future" });
        res.status(200).json({ takenTimes });
    } catch (err) {
        throw err;
    }
});

//get all
router.get("/", crudLimiter, authenticateAccessToken, requireAdmin, async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        throw err;
    }
});

//get one
router.get("/:id", crudLimiter, authenticateAccessToken, requireAdmin, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "invalid appointment id" });
        }
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: "appointment not found" });
        res.status(200).json(appointment);
    } catch (err) {
        throw err;
    }
});

//post
router.post("/", crudLimiter, async (req, res) => {
    try {
        if (!req.body || typeof req.body.phone !== "string") {
            return res.status(400).json({ message: "phone number is required" });
        }
        
        const normalisedPhone = verifyPhoneFormatMonteNegro(req.body.phone);
        if (!normalisedPhone) {
            return res.status(400).json({ message: "invalid phone number" });
        }

        const appointment = new Appointment({
            fullname: req.body.fullname,
            phone: normalisedPhone,
            email: req.body.email,
            service: req.body.service,
            date: req.body.date,
            time: req.body.time,
            details: req.body.details
        });

        const today = new Date();
        today.setHours(0,0,0,0);
        const matchingAppointments = await Appointment.find({ phone: normalisedPhone, date: { $gte: today } });

        if (matchingAppointments.length > 0) {
            return res.status(409).json({message: "An appointment already exists for this phone number."});
        }

        const now = new Date();
        let nowTime = now.toLocaleTimeString('sr-ME', { hour: '2-digit', minute: '2-digit' });
        nowTime = nowTime.replace(":", "");
        const nowTimeHour = parseInt(nowTime.slice(0,2));
        const nowTimeMin = parseInt(nowTime.slice(2));


        const bodyTime = req.body.time.replace(":", "");
        if (bodyTime.length !== 4) {
            return res.status(400).json({message: "bad time field format"})
        }
        const appointHour = parseInt(bodyTime.slice(0,2))//16
        const appointMin = parseInt(bodyTime.slice(2));//:30

        if (appointHour < nowTimeHour) {
            return res.status(400).json({message: "cant create appointment in past date time"})
        } else if (appointHour === nowTimeHour) {
            if(appointMin < nowTimeMin) {
                return res.status(400).json({message: "cant create appointment in past date time"});
            }
        }

        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        throw err;
    }
});

//update
router.patch("/:id", crudLimiter, authenticateAccessToken, requireAdmin, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "invalid appointment id" });
        }

        const updateBody = {
            fullname: req.body.fullname,
            phone: req.body.phone,
            date: req.body.date,
            time: req.body.time,
            details: req.body.details
        };

        const newAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            updateBody,
            { returnDocument: "after", runValidators: true }
        );
        if (!newAppointment) return res.status(404).json({ message: "appointment not found" });
        res.status(200).json({ message: "item updated", item: newAppointment });
    } catch (err) {
        throw err;
    }
});

//delete
router.delete("/:id", crudLimiter, authenticateAccessToken, requireAdmin, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "invalid appointment id" });
        }
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: "appointment not found" });
        res.status(200).json({ message: "deleted item successfully", item: appointment });
    } catch (err) {
        throw err;
    }
});


module.exports = router;