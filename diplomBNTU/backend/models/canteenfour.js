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
    }
});

const CanteenFour = module.exports = mongoose.model("CanteenFour", CanteenShema);