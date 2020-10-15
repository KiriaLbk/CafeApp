const mongoose = require("mongoose");

const CanteenShema = mongoose.Schema({
    dish: {
        type: String
    },
    weight: {
        type: String
    },
    price: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    }
});

const CanteenOne = module.exports = mongoose.model("CanteenOne", CanteenShema);