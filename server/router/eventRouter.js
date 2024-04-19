const express = require("express");

const {
    createEvent,
    getAllEvents,
    createPayment,
    getPaymentsByEvent,
    deleteEvent,
    deletePayment,
} = require("../controllers/eventController");
const router = express.Router();

router.get("/events", getAllEvents);
router.post("/events/new", createEvent);
router.post("/events/:eventId/payment", createPayment);
router.get("/events/:eventId/payments", getPaymentsByEvent);
router.delete("/events/:eventId", deleteEvent);
router.delete("/events/:eventId/payments/:paymentId", deletePayment);

module.exports = {
    eventRouter: router,
};
