const mongoose = require("mongoose");

module.exports = {
    configureDB: () => {
        mongoose.connect("mongodb://localhost:27017/pagui");
        console.log(mongoose.connection.readyState);
    },
};