const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Fixed Admin Login
        if (
            email === process.env.admin_email  &&
            password === "123456789"
        ) {
            return res.redirect("/adminlogin.html");
        }

        return res.send("Invalid Admin Email or Password");

    } catch (error) {

        console.log(error);
        res.status(500).send("Server Error");

    }
};

module.exports = { loginUser };


// const user = await User.findOne({ email });

        // if (!user) {
        //     return res.send("User not found");
        // }

        // if (user.password !== password) {
        //     return res.send("Invalid Password");
        // }

        // // Role Based Redirect

        // if (user.role === "doctor") {
        //     return res.redirect("/doctor.html");
        // }

        // if (user.role === "manager") {
        //     return res.redirect("/manager.html");
        // }

        // if (user.role === "assistant") {
        //     return res.redirect("/assistant.html");
        // }

        // if (user.role === "employee") {
        //     return res.redirect("/employee.html");
        // }

        // res.redirect("/dashboard.html");