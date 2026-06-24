// home healthcare service
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tel1: {
        type: String,
        required: true
    },
    textarea2: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "CardioHomeServ"
});

module.exports = mongoose.model("PonlineAppointment2", userSchema);


