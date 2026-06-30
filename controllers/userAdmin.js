const Appointment = require("../models/userForm.js");
const RegisterUser = require("../models/registerModel.js");

// POST /admin-login — checks hardcoded env vars (no DB needed for admin)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            req.session.isAdmin = true;
            req.session.adminEmail = email;
            return res.json({ success: true, message: "Login successful" });
        }

        return res.status(401).json({ success: false, message: "Invalid email or password" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET /api/admin/stats — dashboard cards + latest activity
const getAdminStats = async (req, res) => {
    try {
        const doctors = await RegisterUser.countDocuments({ role: "doctor" });
        const allAppointments = await Appointment.find().sort({ createdAt: -1 });

        const totalAppointments = allAppointments.length;
        const pending   = allAppointments.filter(a => a.status === "Pending").length;
        const completed = allAppointments.filter(a => a.status === "Completed").length;
        const cancelled = allAppointments.filter(a => a.status === "Cancelled").length;

        // Count unique patients by email
        const uniqueEmails = new Set(allAppointments.map(a => a.patientEmail));
        const patients = uniqueEmails.size;

        // Latest 10 records for activity table
        const latest = allAppointments.slice(0, 10);

        res.json({
            success: true,
            doctors,
            patients,
            appointments: totalAppointments,
            pending,
            completed,
            cancelled,
            latest
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET /api/admin/doctors — list all doctors (no passwords)
const getDoctors = async (req, res) => {
    try {
        const doctors = await RegisterUser.find({ role: "doctor" }).select("-password").sort({ createdAt: -1 });
        res.json({ success: true, doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// DELETE /api/admin/doctors/:id
const deleteDoctor = async (req, res) => {
    try {
        const deleted = await RegisterUser.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: "Doctor not found" });
        res.json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { loginUser, getAdminStats, getDoctors, deleteDoctor };
