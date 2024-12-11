const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "porchsal",
  password: "porchdev",
  database: 'sop_catalog'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;