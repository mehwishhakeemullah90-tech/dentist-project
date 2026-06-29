const express = require("express");
const router = express.Router();

const { createUser, getUsers } = require("../controllers/registerController.js");

router.post("/register", createUser);
router.get("/getusers", getUsers);

module.exports = router;

