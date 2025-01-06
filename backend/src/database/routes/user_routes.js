const express = require("express");
const router = express.Router();
const userQueries = require("../queries/user_queries");
const session = require("express-session");
const jwt = require("jsonwebtoken");

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

router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    userQueries.getUserById(id).then((user) => {
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Error retrieving user",
            });
        }
        res.status(200).json(user);
    });
});



router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    // Check if email and password are provided
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide an Username and password",
        });
    }
    try {
        const foundUser = await userQueries.checkLoginCredentials(username, password);
        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Please try again.",
            });
        }
        const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, { expiresIn: "2h" });  
        res.cookie("token", token, { httpOnly: true, secure: false });
        
        res.status(200).json({
            success: true,  
            message: "User logged in successfully",
            token: token,
        });

        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({
                success: false,
                message: "Error logging in",
            });
        }

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
    // Check if all required fields are provided
    if (!userId || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
        });
    }
    try {
        userQueries.changePassword(userId, newPassword).then((result) => {
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