const mongoose = require("mongoose");

const OrderShema = mongoose.Schema({
    time: {
        type: String
    },
    order: {
        type: String
    },
    user: {
        type: String
    },
    canteen: {
        type: String
    },
    email: {
        type: String
    },
    sum: {
        type: String
    }
});

const Order = module.exports = mongoose.model("Orders", OrderShema);