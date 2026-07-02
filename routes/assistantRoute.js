const express = require("express");
const router  = express.Router();

const controller              = require("../controllers/userAssistant");
const { isAssistantAPI }      = require("../middleware/authMiddleware.js");

// All assistant API routes require an active assistant session
router.put("/updateAppointment/:id",    isAssistantAPI, controller.updateAppointment);
router.delete("/deleteAppointment/:id", isAssistantAPI, controller.deleteAppointment);

module.exports = router;
