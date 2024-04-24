const { Event } = require("../models/event");
const { Payment } = require("../models/payment");
const mongoose = require("mongoose");

const createEvent = async (req, res) => {
    let eventData = req.body;
    try {
        let existEvent = await Event.exists({ title: eventData.title });

        if (existEvent) {
            return res.status(403).json({ errors: { title: "This event is" } });
        }

        let event = new Event({
            title: eventData.title,
            userName: eventData.userName,
            cost: eventData.cost,
        });
        let savedEvent = await event.save();
        let payment = new Payment({
            userName: eventData.userName,
            comment: eventData.comment,
            eventId: savedEvent._id,
            payAmount: eventData.payAmount,
        });
        await payment.save();
        res.json({ event });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errors = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });

            res.status(400).json({ errors: errors });
        } else {
            res.status(500).json({ error: error.toString() });
        }
    }
};
const getAllEvents = async (req, res) => {
    try {
        let events = await Event.find();
        res.json({ events });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errors = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });

            res.status(400).json({ errors: errors });
        } else {
            res.status(500).json({ error: error.toString() });
        }
    }
};

const createPayment = async (req, res) => {
    let paymentData = req.body;
    let eventId = req.params.eventId;
    try {
        let event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        let payment = new Payment({
            ...paymentData,
            eventId,
        });
        await payment.save();
        res.json({ payment });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errors = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });

            res.status(400).json({ errors: errors });
        } else {
            res.status(500).json({ error: error.toString() });
        }
    }
};

const getPaymentsByEvent = async (req, res) => {
    let eventId = req.params.eventId;
    try {
        let payments = await Payment.find({ eventId });
        res.json({ payments });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errors = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });

            res.status(400).json({ errors: errors });
        } else {
            res.status(500).json({ error: error.toString() });
        }
    }
};

const deleteEvent = async (req, res) => {
    let eventId = req.params.eventId;
    try {
        await Payment.deleteMany({ eventId });
        await Event.findByIdAndDelete(eventId);
        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
const deletePayment = async (req, res) => {
    let paymentId = req.params.paymentId;
    try {
        await Payment.findByIdAndDelete(paymentId);
        res.json({ message: "Payment deleted" });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    createPayment,
    getPaymentsByEvent,
    deleteEvent,
    deletePayment,
};
