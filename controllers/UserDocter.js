// drPatientform.js

// const Appointment = require("../models/userAssistant.js");

// // Sirf ek specific doctor ki appointments fetch karna
// exports.getDoctorAppointments = async (req, res) => {
//     try {
//         const doctorName = req.params.doctorName;

//         console.log("Fetching appointments for doctor:", doctorName);

//         const appointments = await Appointment.find({ Docter: doctorName });

//         res.json(appointments);

//     } catch (error) {
//         console.log("Error:", error);
//         res.status(500).json({ message: "Error fetching appointments" });
//     }
// };

// // Appointment ko "Completed" mark karna
// exports.markComplete = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const updated = await Appointment.findByIdAndUpdate(
//             id,
//             { status: "Completed" },
//             { new: true }
//         );

//         if (!updated) {
//             return res.status(404).json({ message: "Appointment not found" });
//         }

//         res.json({ message: "Marked as completed", data: updated });

//     } catch (error) {
//         console.log("Error:", error);
//         res.status(500).json({ message: "Error updating status" });
//     }
// };