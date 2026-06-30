const DoctorAccount = require("../models/docterAccount.js");
const Appointment = require("../models/userForm.js");
const bcrypt = require("bcrypt");

// Doctor Login
exports.doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await DoctorAccount.findOne({ email });

        if (!doctor) {
            return res.status(401).json({ message: "Email ya password galat hai" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Email ya password galat hai" });
        }

        req.session.isDoctor = true;
        req.session.doctorName = doctor.doctorName;

        res.json({ success: true, doctorName: doctor.doctorName });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Doctor ki appointments fetch karna (Docter field se match)
exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctorName = req.params.doctorName;
        const appointments = await Appointment.find({ Docter: doctorName });
        res.json(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching appointments" });
    }
};

// Appointment ko Completed mark karna
exports.markComplete = async (req, res) => {
    try {
        const id = req.params.id;

        const updated = await Appointment.findByIdAndUpdate(
            id,
            { status: "Completed" },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ message: "Marked as completed", data: updated });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating status" });
    }
};
