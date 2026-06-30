const mongoose = require("mongoose");

const doctorAccountSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    doctorName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "doctor"
    }

}, {
    timestamps: true,
    collection: "DoctorAccounts"
});

module.exports = mongoose.model("DoctorAccount", doctorAccountSchema);