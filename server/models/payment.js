const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    payer: { type: String, required: true},
    paymentAmount: {
        type: Number,
        required: true,
    },
    date: { type: Date, default: Date.now },
    comment: { type: String },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = { Payment };
