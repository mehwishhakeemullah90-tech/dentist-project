const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

const adminRoute        = require("./routes/AdminRoute.js");
const appointmentRoutes = require("./routes/patientRoute.js");
const assistantRoute    = require("./routes/assistantRoute.js");
const userdoctorRoute   = require("./routes/UserDoctorRoute.js");
const registerRoute     = require("./routes/registerRoute.js");
const authRoute         = require("./routes/authRoute.js");
const taskRoute         = require("./routes/taskRoute.js");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 4000;
const MDB  = process.env.MDB_URL;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || "fallback_secret_change_me",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }   // 1 hour
}));

// ── Static files (public/ only) ───────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// Block direct /views/ access — all views must be served through routes
app.get("/views/admin.html",        (req, res) => res.redirect("/admin"));
app.get("/views/userdocter.html",   (req, res) => res.redirect("/doctor"));
app.get("/views/registerform.html", (req, res) => res.redirect("/register-form"));
app.get("/views/assistant.html",    (req, res) => res.sendFile(path.join(__dirname, "views/assistant.html")));

// ── Default route ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/", authRoute);         // /login, /admin-login-page, /register-form
app.use("/", adminRoute);        // /admin-login, /admin, /admin-logout, /api/admin/*
app.use("/", userdoctorRoute);   // /doctor-login, /doctor, /doctor-logout, /api/doctor/*
app.use("/", registerRoute);     // /register
app.use("/", appointmentRoutes); // /submit-form, /getall, /update/:id, /deleteUser/:id
app.use("/", assistantRoute);    // /updateAppointment/:id, /deleteAppointment/:id
app.use("/", taskRoute);         // /dashboard, /tasks (task-manager feature)

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

// ── MongoDB + server start ────────────────────────────────────────────────────
mongoose.connect(MDB)
    .then(() => {
        console.log("MongoDB connected:", mongoose.connection.name);
        app.listen(PORT, () => {
            console.log(`Server running → http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });
