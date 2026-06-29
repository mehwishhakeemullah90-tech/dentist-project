const mongoose = require("mongoose");

const doctorAccountSchema = new mongoose.Schema({
    doctorName: { type: String, required: true },   // jaise "Talha" - appointment ke "Docter" field se match karega
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true, collection: "DoctorAccounts" });

module.exports = mongoose.model("DoctorAccount", doctorAccountSchema);