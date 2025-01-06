const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected_route', authMiddleware, (req, res) => {
    res.status(200).json ({ 
        message: 'This is a protected route', 
        user: req.user
    });
});

module.exports = router;