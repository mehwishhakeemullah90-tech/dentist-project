const RegisterUser = require("../models/registerModel.js");
const Appointment = require("../models/userForm.js");
const bcrypt = require("bcrypt");

// POST /doctor-login
exports.doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Look up in RegisterForm collection (role must be "doctor")
        const doctor = await RegisterUser.findOne({
            email: email.toLowerCase().trim(),
            role: "doctor"
        });

        if (!doctor) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        req.session.isDoctor = true;
        req.session.doctorId = doctor._id;
        req.session.doctorName = doctor.fullName;

        res.json({ success: true, doctorName: doctor.fullName });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET /api/doctor/appointments  — uses session doctorName
exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctorName = req.session.doctorName;
        const appointments = await Appointment.find({ Docter: doctorName }).sort({ createdAt: -1 });
        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching appointments" });
    }
};

// PATCH /api/doctor/appointments/:id/status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["Pending", "Completed", "Cancelled"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status. Use Pending, Completed, or Cancelled" });
        }

        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        res.json({ success: true, message: "Status updated", data: updated });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// PUT /api/doctor/patients/:id — edit patient info
exports.updatePatient = async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ success: false, message: "Patient not found" });
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// DELETE /api/doctor/patients/:id
exports.deletePatient = async (req, res) => {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: "Patient not found" });
        res.json({ success: true, message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
