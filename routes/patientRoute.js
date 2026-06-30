const express = require("express");
const router = express.Router();

const {
    create,
    getUsers,
    update,
    deleteUser
} = require("../controllers/userForm");

// Patient appointment form submission
router.post("/submit-form", create);

// Get all appointments (used by assistant dashboard)
router.get("/getall", getUsers);

// Update appointment
router.put("/update/:id", update);

// Delete appointment
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
