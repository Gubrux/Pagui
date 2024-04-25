const User = require("../models/user").User;

const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

module.exports = {
    getAllUsers,
    getUser,
};
