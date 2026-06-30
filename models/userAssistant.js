const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    patientPhone: {
    type: String,       
    required: true
    },
    Docter: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    }

//     status: {
//     type: String,        
//     default: "Pending"
// }
},

    { timestamps: true, collection: "PatientForm" });

module.exports = mongoose.model("AppointmentAlt", appointmentSchema);