const db = require("../connection");
console.log(db);
const getAllSites = (req, res) => {
  db.query("SELECT * FROM sites", (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error"
      });
    }

    res.json(rows);
  });
}

console.log(getAllSites);
module.exports = {
  getAllSites
};