const express = require("express");
const router  = express.Router();
const path    = require("path");

const { unifiedLogin, getMe, logout } = require("../controllers/authController.js");

// ── Pages ──────────────────────────────────────────────────────────────────

// Single login page for all staff roles (admin / doctor / assistant)
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Legacy login-page aliases → redirect to the unified page
router.get("/admin-login-page", (req, res) => res.redirect("/login"));

// Register form (admin creates new doctor/assistant accounts)
router.get("/register-form", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/registerform.html"));
});

// ── API ────────────────────────────────────────────────────────────────────

// Unified login for admin, doctor, assistant
router.post("/api/login", unifiedLogin);

// Returns current session user info (used by dashboards to show name/role)
router.get("/api/me", getMe);

// Logout — destroys session and redirects to /login
router.get("/logout", logout);

module.exports = router;
