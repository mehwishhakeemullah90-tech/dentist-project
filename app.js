const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyparser = require("body-parser");
const route = require("./routes/userRoutecardio1.js");

dotenv.config();

const PORT = process.env.PORT || 9000;
const MDB = process.env.MDB_URL;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({extended: true}));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/cardio/cardioform.html"));
});


// MongoDB connect
mongoose.connect(MDB)

.then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch((error) => console.log("MongoDB error:", error));

mongoose.connection.on("connected", () =>{
console.log("connectedDB:", mongoose.connection.name)
})

app.use("/", route)