const express = require("express");
const router = express.Router();
const userQueries = require("../queries/user_queries");
const bcrypt = require("bcryptjs");

router.Post("/login", (req, res) => {
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