const express = require("express");
const router = express.Router();
const path = require("path");

const { doctorLogin, getDoctorAppointments, markComplete } = require("../controllers/UserDocter.js");

// Doctor login POST — session set karta hai
router.post("/doctor-login", doctorLogin);

// Doctor dashboard page — sirf logged-in doctor dekh sakta hai
router.get("/doctor", (req, res) => {
    if (!req.session.isDoctor) {
        return res.redirect("/practs2.html");
    }
    res.sendFile(path.join(__dirname, "../views/userdocter.html"));
});

// Doctor logout
router.get("/doctor-logout", (req, res) => {
    req.session.destroy();
    res.redirect("/practs2.html");
});

// Doctor ki appointments
router.get("/doctor-appointments/:doctorName", getDoctorAppointments);

// Appointment complete mark karna
router.put("/markComplete/:id", markComplete);

module.exports = router;
