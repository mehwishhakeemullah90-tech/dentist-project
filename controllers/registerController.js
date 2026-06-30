const User = require("../models/registerModel.js");
const bcrypt = require("bcrypt");

// CREATE — Naya account banana
exports.createUser = async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "Ye email already registered hai" });
        }

        // Password hash karo plain text save mat karo
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Account successfully ban gaya",
            data: { fullName: newUser.fullName, email: newUser.email, role: newUser.role }
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            message: "Account banane mein error aaya",
            error: error.message
        });
    }
};

// READ
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");  // password field wapis mat bhejo
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};
