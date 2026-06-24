const CardioDR1 = require("../models/userModelscardio1.js");

const createUser = async (req, res) => {
    try {

        console.log("BODY:", req.body);

        const user = new CardioDR1(req.body);

        const saved = await user.save();

       console.log("I m in create user function")
        // console.log(req.body);

        res.json({
            message: "Saved successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createUser };