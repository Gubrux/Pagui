const moongoose = require("mongoose");
const { Schema } = moongoose;

const PaymentSchema = new Schema({
    userName: {
        type: String,
        required: [true, "The payment needs a username."],
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: "Events",
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        default: 0,
    },
    payment: {
        type: String,
    },
});
const Payment = moongoose.model("Payments", PaymentSchema);
module.exports = {
    Payment,
};
