const express = require("express");
const router = express.Router();
const userQueries = require("../queries/user_queries");

router.post("/users/add", (req, res) => {
    const { username, first_name, last_name, password } = req.body;
    // Check if all required fields are provided
    if (!username || !first_name || !last_name || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
        });
    }

    userQueries.addUser(username, first_name, last_name, password).then((addedUser) => {
        if (!addedUser) {
            return res.status(500).json({
                success: false,
                message: "Error adding user",
            });
        }

        res.status(200).json(addedUser);
    });
})

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide an email and password",
        });
    }

    userQueries.checkLoginCredentials(email, password).then((foundUser) => {
        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Please try again.",
            });
        }

        res.session.user_id = foundUser.id;
        res.status(200).json(foundUser);
    });

});

router.get("/users", (req, res) => {
    userQueries.getUsers().then((users) => {
        if (!users) {
            return res.status(500).json({
                success: false,
                message: "Error retrieving users",
            });
        }

        res.status(200).json(users);
    });
});

router.post("/change-password", (req, res) => {
    const {userId, newPassword} = req.body;
    console.log(userId);
    // Check if all required fields are provided
    if (!userId || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
        });
    }
    try {
        userQueries.changePassword(userId, newPassword).then((result) => {
            console.log(userId, newPassword);
            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: "Error changing password",
                });
            }

            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({
            success: false,
            message: "Error changing password",
        });
    }
}
);


router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
});

module.exports = router;