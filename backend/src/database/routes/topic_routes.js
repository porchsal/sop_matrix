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

module.exports = router;