const express = require("express");
const router = express.Router();
const path = require("path");

const { loginUser } = require("../controllers/userAdmin.js");

// Admin login POST — session set karta hai
router.post("/admin-login", loginUser);

// Admin panel page — sirf logged-in admin dekh sakta hai
router.get("/admin", (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../views/admin.html"));
});

// Admin logout
router.get("/admin-logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
