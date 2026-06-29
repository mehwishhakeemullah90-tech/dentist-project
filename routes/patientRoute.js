const express = require("express");
const router = express.Router();

const {
    create,
    getUsers,
    update,
    deleteUser
} = require("../controllers/userForm");

router.post("/submit-form", create);
router.get("/getall", getUsers);
router.put("/update/:id", update);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;



// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
