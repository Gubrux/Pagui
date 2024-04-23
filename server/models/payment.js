const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    // pay: { type: Number, required: [true, "add your pay please"] },

    payment: {
        type: String,
    },
});
const Payment = mongoose.model("Payments", PaymentSchema);
module.exports = {
    Payment,
};
