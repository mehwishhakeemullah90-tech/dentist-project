// const Appointment = require("../models/userAssistant");
const { update } = require("./userForm");
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

        console.log("====================================");
        console.log("Received ID:", id);
        console.log("ID length:", id.length);   // valid MongoDB ID ki length 24 honi chahiye
        console.log("Is valid ObjectId?", mongoose.Types.ObjectId.isValid(id));
        console.log("Connected to database:", mongoose.connection.name);
        console.log("Model is using collection:", Appointment.collection.name);
        console.log("Received Body:", req.body);
        console.log("====================================");

        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
              { returnDocument: "after" }   // ✅ "new: true" ki jagah ye naya syntax
        );

        console.log("Found and updated document:", updated);

        if (!updated) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json(updated);

    } catch (err) {

        res.status(500).json({
            message: "Error updating appointment"
        });

    }

};

exports.deleteAppointment = async (req, res) => {
    try {

        await Appointment.findByIdAndDelete(req.params.id);

        res.json({
            message: "Appointment deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: "Error deleting appointment"
        });

    }
};