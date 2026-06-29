const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/userAdmin.js");

router.post("/admin-login", loginUser);

module.exports = router;