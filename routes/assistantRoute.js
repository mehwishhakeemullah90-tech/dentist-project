const express = require("express");
const router = express.Router();

const controller = require("../controllers/userAssistant");

// Create
// router.post("/PatientForm", controller.createAppointment);
router.post("/submit-form", controller.createAppointment);

// Read
router.get("/getall", controller.getAppointments);

// Update
router.put("/updateAppointment/:id", controller.updateAppointment);

// Delete
router.delete("/deleteAppointment/:id", controller.deleteAppointment);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const controller = require("../controllers/userAssistant.js");

// // save data
// router.post("/PatientForm", controller.createAppointment);

// // get data
// router.get("/PatientForm", controller.getAppointments);

// module.exports = router;