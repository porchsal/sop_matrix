const express = require("express");
const router = express.Router();
const topicQueries = require("../queries/topic_queries");

router.get("/topics", (req, res) => {
    topicQueries.getAllTopics()    
    .then((topic) => {
        res.json(topic);
    return;
    });
});

router.post("/topics/add", async (req, res) => {
    const { topic_name } = req.body;
    console.log('Topic name:', topic_name);

    try {
        const result = await topicQueries.addTopic(topic_name);
        res.status(200).send({ message: 'Topic added successfully', result });
    } catch (error) {
        console.error('Error adding topic:', error);
        res.status(500).send({ message: 'Error adding topic', error });
    }
});

module.exports = router;