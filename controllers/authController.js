const User = require("../models/User");
const bcrypt = require("bcryptjs");

// POST /signup
exports.postSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (name.trim().length < 2) {
            return res.status(400).json({ success: false, message: "Name must be at least 2 characters" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email address" });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ success: false, message: "This email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        req.session.userId = user._id;
        req.session.userName = user.name;

        res.status(201).json({ success: true, message: "Account created successfully! Redirecting..." });

    } catch (error) {
        console.log("Signup error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
};

// POST /login
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        req.session.userId = user._id;
        req.session.userName = user.name;

        res.json({ success: true, message: "Login successful! Redirecting..." });

    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
};

// GET /logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log("Session destroy error:", err);
        res.redirect("/login");
    });
};

// POST /api/login — unified staff login (admin, doctor, assistant)
exports.unifiedLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Only allow staff roles — regular "user" accounts cannot use this endpoint
        const user = await User.findOne({
            email: email.toLowerCase().trim(),
            role: { $in: ["admin", "doctor", "assistant"] }
        });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Regenerate session to prevent session fixation attacks
        req.session.regenerate((err) => {
            if (err) return res.status(500).json({ success: false, message: "Session error" });

            // Unified fields used by all protected routes
            req.session.userId   = user._id.toString();
            req.session.role     = user.role;
            req.session.userName = user.name;

            // Role-specific flags kept for backward compatibility with existing middleware
            if (user.role === "admin") {
                req.session.isAdmin = true;
            } else if (user.role === "doctor") {
                req.session.isDoctor   = true;
                req.session.doctorId   = user._id.toString();
                req.session.doctorName = user.name;  // used by getDoctorAppointments filter
            } else if (user.role === "assistant") {
                req.session.isAssistant = true;
            }

            res.json({ success: true, role: user.role, name: user.name });
        });

    } catch (error) {
        console.error("Unified login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET /api/me — returns logged-in user info from session (used by dashboards)
exports.getMe = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    res.json({
        success: true,
        name: req.session.userName,
        role: req.session.role
    });
};
