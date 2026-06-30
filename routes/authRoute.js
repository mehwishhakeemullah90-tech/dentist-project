const express = require("express");
const router = express.Router();
const path = require("path");

// Doctor login page (public/practs2.html)
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/practs2.html"));
});

// Admin login page
router.get("/admin-login-page", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin-login.html"));
});

// Register form (admin creates new doctor accounts)
router.get("/register-form", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/registerform.html"));
});

module.exports = router;
