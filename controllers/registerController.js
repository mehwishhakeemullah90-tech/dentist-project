const User = require("../models/registerModel.js");

// CREATE — Naya account banana
exports.createUser = async (req, res) => {
    try {
        console.log("Received data:", req.body);

        // Pehle check karen ke email already exist to nahi karti
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "Ye email already registered hai" });
        }

        const newUser = await User.create(req.body);

        res.status(201).json({
            message: "Account successfully ban gaya",
            data: newUser
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            message: "Account banane mein error aaya",
            error: error.message
        });
    }
};

// READ — Sare users dekhna (agar future mein chahiye ho)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};