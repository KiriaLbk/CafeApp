const mongoose = require("mongoose");

const DishesShema = mongoose.Schema({
    dish: {
        type: String
    },
    weight: {
        type: String
    },
    price: {
        type: String
    },
    canteen: {
        type: String
    },
    user: {
        type: String
    }
});

const Dish = module.exports = mongoose.model("Dishes", DishesShema);