// index.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const adminRoute = require("./routes/AdminRoute.js");
const appointmentRoutes = require("./routes/patientRoute.js");
const assistantRoute = require("./routes/assistantRoute.js");
// const userdocterRoute = require("./routes/UserDocterRoute.js");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MDB = process.env.MDB_URL;

// // ================= DATA STORE =================
// let appointments = [];Yahan add kiya

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// ================= STATIC FILES =================
app.use(express.static(path.join(__dirname, "public")));

// ================= DEFAULT ROUTE =================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

// is code say assistant ko form data mil rha hy
app.use("/views", express.static(path.join(__dirname, "views/assistant.html")));
// app.use("/views", express.static(path.join(__dirname, "views/drpatientForm.html")));
app.use("/views", express.static(path.join(__dirname, "views")));
const registerRoute = require("./routes/registerRoute.js");


// ================= ROUTES =================
app.use("/", adminRoute);
app.use("/", appointmentRoutes);
app.use("/", assistantRoute); 
app.use("/", registerRoute);
// app.use("/", userdocterRoute);


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




// =============================================
// =============================================
// =============================================


 