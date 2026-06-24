// home healthcare service
const CardioDR2 = require("../models/userModelscardio2.js");

const createUser2 = async (req, res) => {
    try {

        console.log("BODY:", req.body);

        const user = new CardioDR2(req.body);

        const saved = await user.save();
        console.log("Saved:", saved);
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

module.exports = { createUser2 };