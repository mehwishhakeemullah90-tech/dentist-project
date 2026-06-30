const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

const adminRoute = require("./routes/AdminRoute.js");
const appointmentRoutes = require("./routes/patientRoute.js");
const assistantRoute = require("./routes/assistantRoute.js");
const userdocterRoute = require("./routes/UserDocterRoute.js");
const registerRoute = require("./routes/registerRoute.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MDB = process.env.MDB_URL;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }  // 1 ghanta
}));

// ================= STATIC FILES =================
app.use(express.static(path.join(__dirname, "public")));

// Protected pages — seedha /views/ se access nahi, sirf route se
// assistant.html seedha accessible hai (abhi login system nahi)
app.get("/views/assistant.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views/assistant.html"));
});

// admin.html aur userdocter.html block karo direct access
app.get("/views/admin.html", (req, res) => res.redirect("/admin"));
app.get("/views/userdocter.html", (req, res) => res.redirect("/doctor"));

// ================= DEFAULT ROUTE =================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

// ================= ROUTES =================
app.use("/", adminRoute);
app.use("/", appointmentRoutes);
app.use("/", assistantRoute);
app.use("/", userdocterRoute);
app.use("/", registerRoute);

// ================= MONGODB CONNECTION =================
mongoose.connect(MDB)
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB error:", error);
});

mongoose.connection.on("connected", () => {
    console.log("Database connected:", mongoose.connection.name);
});
