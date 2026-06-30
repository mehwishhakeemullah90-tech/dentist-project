const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            req.session.isAdmin = true;
            return res.json({ success: true });
        }

        return res.status(401).json({ success: false, message: "Invalid Email or Password" });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server Error" });

    }
};

module.exports = { loginUser };
