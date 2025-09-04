const jwt = require("jsonwebtoken");
const db = require("../connection");
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const auth_middleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.id;

        // Query the user's role/profile from the database
        const [rows] = await db.execute(
            `SELECT u.id, u.username, r.name AS role
            FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.id = ?`,
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        //Attach full user info to request object
        req.user = {
            id: rows[0].id,
            username: rows[0].username,
            role: rows[0].role
        }
  
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = auth_middleware;