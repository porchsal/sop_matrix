var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "porchsal",
  password: "porchdev"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});