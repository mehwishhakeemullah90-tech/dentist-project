const Appointment = require("../models/userForm.js");
const mongoose = require("mongoose");

// SAVE FORM DATA
exports.createAppointment = async (req, res) => {
    try {
        const data = new Appointment(req.body);
        await data.save();
        res.json({ message: "Appointment saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error saving data" });
    }
};

// GET ALL DATA
exports.getAppointments = async (req, res) => {
    try {
        const data = await Appointment.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data" });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const id = req.params.id;

        const updated = await Appointment.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json(updated);

    } catch (err) {
        res.status(500).json({ message: "Error updating appointment" });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting appointment" });
    }
};
