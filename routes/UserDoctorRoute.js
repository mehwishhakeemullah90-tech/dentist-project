const express = require("express");
const router = express.Router();
const path = require("path");

const {
    doctorLogin,
    getDoctorAppointments,
    updateAppointmentStatus,
    updatePatient,
    deletePatient
} = require("../controllers/UserDoctor.js");

const { isDoctor, isDoctorAPI } = require("../middleware/authMiddleware.js");

// ── Auth ───────────────────────────────────────────────────────────────────
router.post("/doctor-login", doctorLogin);

router.get("/doctor-logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

// ── Doctor dashboard page (protected) ─────────────────────────────────────
router.get("/doctor", isDoctor, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/userdoctor.html"));
});

// ── API: appointments (session-based — only this doctor's data) ────────────
router.get("/api/doctor/appointments", isDoctorAPI, getDoctorAppointments);

// ── API: update status (Pending / Completed / Cancelled) ──────────────────
router.patch("/api/doctor/appointments/:id/status", isDoctorAPI, updateAppointmentStatus);

// ── API: patient CRUD ─────────────────────────────────────────────────────
router.put("/api/doctor/patients/:id", isDoctorAPI, updatePatient);
router.delete("/api/doctor/patients/:id", isDoctorAPI, deletePatient);

module.exports = router;
