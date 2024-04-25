const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParticipantSchema = new Schema({
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The participant ID is required"],
    },
    participantCost: {
        type: Number,
        default: 0,
    },
});

const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, "The event needs a title"],
        minlength: [10, "The title must be at least 10 characters long."],
    },
    createdBy: {
        type: String,
        required: [true, "The event needs a creator."],
    },
    eventCost: {
        type: Number,
        required: [true, "The event needs a cost"],
    },
    remainingCost: {
        type: Number,
        default: 0,
    },
    participants: [ParticipantSchema],
    createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = {
    Event,
};
