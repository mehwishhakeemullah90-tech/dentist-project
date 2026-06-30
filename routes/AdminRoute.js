const express = require("express");
const router = express.Router();
const path = require("path");

const { loginUser, getAdminStats, getDoctors, deleteDoctor } = require("../controllers/userAdmin.js");
const { createUser } = require("../controllers/registerController.js");
const { isAdmin, isAdminAPI } = require("../middleware/authMiddleware.js");

// ── Auth ───────────────────────────────────────────────────────────────────
router.post("/admin-login", loginUser);

router.get("/admin-logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

// ── Admin dashboard page (protected) ──────────────────────────────────────
router.get("/admin", isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/admin.html"));
});

// ── API: dashboard stats ───────────────────────────────────────────────────
router.get("/api/admin/stats", isAdminAPI, getAdminStats);

// ── API: doctor management ─────────────────────────────────────────────────
router.get("/api/admin/doctors", isAdminAPI, getDoctors);
router.post("/api/admin/doctors", isAdminAPI, createUser);          // reuse register controller
router.delete("/api/admin/doctors/:id", isAdminAPI, deleteDoctor);

module.exports = router;
