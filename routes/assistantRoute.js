const express = require("express");
const router = express.Router();

const controller = require("../controllers/userAssistant");

// Update
router.put("/updateAppointment/:id", controller.updateAppointment);

// Delete
router.delete("/deleteAppointment/:id", controller.deleteAppointment);

module.exports = router;
