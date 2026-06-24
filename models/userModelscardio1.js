// CARDIO MODEL 1

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    idcardnum: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true
    },

    tel: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: "CardioOnlineAppoint"
});

module.exports = mongoose.model("OnlineAppiontment1", userSchema);