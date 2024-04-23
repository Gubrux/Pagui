const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, "The event needs a title"],
        minlength: [10, "The title must be at least 10 characters long."],
    },
    userName: {
        type: String,
        required: [true, "The event needs a username."],
    },
    cost: { type: Number, required: [true, "The event need a cost"] },
});

const Event = mongoose.model("Events", EventSchema);

module.exports = {
    Event,
};
