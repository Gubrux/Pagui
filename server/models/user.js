const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "The user needs a first name"],
        minlength: [10, "The name must be at least 10 characters long"],
    },
    email: {
        type: String,
        required: [true, "The user needs a email"],
    },
    password: {
        type: String,
        required: [true, "The user needs a password"],
    },
});

const User = mongoose.model("Users", UserSchema);

module.exports = {
    User,
};
