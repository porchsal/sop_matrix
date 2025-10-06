const express = require("express");
const router = express.Router();
const topicQueries = require("../queries/topic_queries");
const auditLogger = require("../middleware/auditLogger");
const auth_middleware = require("../middleware/authMiddleware");

router.get("/topics", (req, res) => {
    topicQueries.getAllTopics()    
    .then((topic) => {
        res.json(topic);
    return;
    });
});

router.post("/topics/add",
    auth_middleware,
    auditLogger('CREATE', 'TOPIC', (req) => req.body.topic_name ),
    async (req, res) => {
    const { topic_name } = req.body;
    try {
        const result = await topicQueries.addTopic(topic_name);
        res.status(200).send({ message: 'Topic added successfully', result });
    } catch (error) {
        console.error('Error adding topic:', error);
        res.status(500).send({ message: 'Error adding topic', error });
    }
});

module.exports = router;