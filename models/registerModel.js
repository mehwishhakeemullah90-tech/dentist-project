const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },   // unique = ek email do dafa register nahi ho sakti
    password:
    {
        type: String,
        required: true
    },
    role:
    {
        type: String,
        required: true
    }
}, { timestamps: true, collection: "RegisterForm" });

module.exports = mongoose.model("RegisterUser", appointmentSchema);


