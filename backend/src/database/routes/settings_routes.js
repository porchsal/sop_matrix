const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/settings', authMiddleware, roleMiddleware(['Administrator', 'Manager']), (req, res) => {
    res.status(200).json ({ 
        message: 'This is the settings route, accessible only to Administrators and Managers', 
        user: req.user
    });
});
module.exports = router;