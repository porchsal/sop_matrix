const db = require("../connection");

const getAllTopics = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT id AS ID, topic_name AS Name FROM topic', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
                resolve(rows);
             });        
        });
};  

const addTopic = (topic_name) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO topic (topic_name) VALUES (?)', [topic_name], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}



module.exports = {
  getAllTopics,
    addTopic
};