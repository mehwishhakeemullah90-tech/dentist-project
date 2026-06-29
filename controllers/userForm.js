const User = require("../models/userForm.js");

// CREATE
exports.create = async (req, res) => {
    try {
        console.log("i am creating function");
        console.log(req.body);

         const user = await User.create(req.body);
        
        // const saved = await newUser.save();

        return res.status(201).json({
            message: "Saved successfully",
            data: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error saving data",
            error: error.message
        });
    }
};


// READ
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};


// UPDATE
exports.update = async (req, res) => {
    try {
       const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if (!userExist)
            return res.json({message:"no record found"});
        const updateUser = await User.findByIdAndUpdate(id, req.body,{new:true});
        res.json(updateUser);
    } catch (error) {
        res.status(500).json(error);
    }
};


// DELETE
exports.deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const userExist = await User.findOne({_id: id})

        if(!userExist)
            return res.json({message: "no record found"});
        await User.findByIdAndDelete (id)
       res.json({ message: "delete successful" });

    } catch (error) {
        res.status(500).json(error);
    }
};


// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

