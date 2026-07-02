/**
 * One-time seed script — creates the admin account in MongoDB.
 *
 * Usage:
 *   node scripts/createAdmin.js
 *
 * It reads credentials from .env (ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME).
 * Safe to run multiple times — it skips creation if the admin already exists.
 */

require("dns").setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User.js");

async function createAdmin() {
    const email    = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name     = process.env.ADMIN_NAME || "Admin";

    if (!email || !password) {
        console.error("ERROR: Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first.");
        process.exit(1);
    }

    await mongoose.connect(process.env.MDB_URL);
    console.log("Connected to MongoDB:", mongoose.connection.name);

    // Check if admin already exists
    const existing = await User.findOne({ email: email.toLowerCase(), role: "admin" });
    if (existing) {
        console.log(`Admin already exists: ${existing.email}`);
        await mongoose.disconnect();
        return;
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email:    email.toLowerCase().trim(),
        password: hashed,
        role:     "admin"
    });

    console.log(`Admin account created successfully!`);
    console.log(`  Name:  ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Login at: http://localhost:${process.env.PORT || 4000}/login`);

    await mongoose.disconnect();
}

createAdmin().catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
});
