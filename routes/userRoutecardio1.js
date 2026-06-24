const express = require("express");
const router = express.Router();


const { createUser } = require("../controllers/userControllerscardio1.js");
const { createUser2} = require("../controllers/userControllerscardio2.js");

// router.post("/createUser", createUser);

router.post("/submit-form1", createUser)
router.post("/submit-form2", createUser2)

module.exports = router;

