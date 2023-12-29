const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    preferences: {
        type: [[String]],
        required: false,
    },
    ingredients: {
        type: [],
        ref: 'Ingredient',
        required: true,
    },
    savedRecipes: {
        type: [Number],
        required: false,
    },
    subscription: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);
export default User;