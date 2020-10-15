const mongoose = require("mongoose");

const CanteenShema = mongoose.Schema({
    name: {
        type: String
    }
});

const Canteen = module.exports = mongoose.model("Canteen", CanteenShema);