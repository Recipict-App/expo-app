const mongoose = require("mongoose");


const IngredientSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: false,
    },
    dateAdded: {
        type: Date,
        required: true,
    },
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);
export default Ingredient;