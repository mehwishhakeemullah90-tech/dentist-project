const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    Docter: {   // FIXED HERE
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
}, {
    collection: "PatientsForm"
});
module.exports= mongoose.model("DentistAppointment", userSchema)
