const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// POST /api/admin/doctors — Admin creates a new doctor account
exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: fullName,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: role || "doctor"
        });

        res.status(201).json({
            message: "Doctor account created successfully",
            data: { name: newUser.name, email: newUser.email, role: newUser.role }
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating account", error: error.message });
    }
};

// GET /getusers
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "doctor" }).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};
